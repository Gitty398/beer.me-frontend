import { useContext, useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router';
import * as beerService from './services/beerService';
import Navbar from './components/Navbar/Navbar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import { UserContext } from "./contexts/UserContext";
import BeerList from './pages/BeerList/BeerList';
import BeerDetail from './pages/BeerDetail/BeerDetail';
import BeerForm from './pages/BeerForm/BeerForm';


function App() {
  const [beers, setBeers] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeers = async () => {
      const beersData = await beerService.index();

      setBeers(beersData);
    }

    if (user) fetchBeers();
  }, [user]);

  const handleAddBeer = async (formData) => {
    try {
      const newBeer = await beerService.create(formData);
      if (newBeer.err) {
        throw new Error(newBeer.err);
      }

      setBeers((prev) => [...prev, newBeer]);
      navigate(`/beer/${newBeer.beer._id}`);

    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteBeer = async (beerId) => {
    try {
      const deletedBeer = await beerService.deleteBeer(beerId);
      if (deletedBeer.err) {
        throw new Error(deletedBeer.err);
      }

      setBeers(beers.filter((beer) => beer._id !== beerId));
      navigate("/beer")

    } catch (error) {
      console.log(error)
    }
  }

  const handleEditBeer = async (formData, beerId) => {
    try {
      const selectedBeer = await beerService.updateBeer(formData, beerId);
      if (selectedBeer.err) {
        throw new Error(selectedBeer.err)
      }

      setBeers(beers.map((b) => (b._id === beerId ? selectedBeer : b)));
      navigate(`/beer/${beerId}`)

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <LandingPage />} />
        {user ? (
          <>
            <Route path='/beer' element={<BeerList beers={beers}/>} />
            <Route 
              path="/beer/new"
              element={<BeerForm 
                handleAddBeer={handleAddBeer}
                handleEditBeer={handleEditBeer}
                />}
            />
            <Route
              path="/beer/:beerId"
              element={<BeerDetail handleDeleteBeer={handleDeleteBeer} />}
            />
            <Route
              path="/beer/:beerId/edit"
              element={<BeerForm handleEditBeer={handleEditBeer}/>}
            />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}

      </Routes>
    </>
  )
}

export default App