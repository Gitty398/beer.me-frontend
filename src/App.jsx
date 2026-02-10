import './App.css'
import { useContext, useState, useEffect } from 'react'
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
// import BeerForm from './pages/BeerForm/BeerForm';


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
              element={<BeerForm handleAddBeer={handleAddBeer} />}
            />
            <Route
              path="/beer/:beerId"
              element={<BeerDetail handleDeleteBeer={handleDeleteBeer} />}
            />
            <Route
              path="/beer/:beerId/edit"
              element={<BeerForm handleEditBeer={handleDeleteBeer}/>}
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