import { useContext, useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router';
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
import LocationForm from './pages/LocationForm/LocationForm';
import UserBeerList from './pages/UsersBeerList/UsersBeerList'


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

  const handleAddLocation = async (formData, beerId) => {
    try {
      const selectedBeer = await beerService.createLocation(formData, beerId);
      if (selectedBeer.err) {
        throw new Error(selectedBeer.err)
      }

      setBeers(beers.map((b) => (b._id === beerId ? selectedBeer : b)));
      navigate(`/beer/${beerId}`)

    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteLocation = async (beerId, locationId) => {
    try {
      const selectedBeer = await beerService.deleteLocation(beerId, locationId);
      if (selectedBeer.err) {
        throw new Error(selectedBeer.err);
      }

      setBeers(beers.map((b) => (b._id === beerId ? selectedBeer : b)));
      navigate(`/beer/${beerId}/`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditLocation = async (formData, beerId, locationId) => {
    try {
      const selectedBeer = await beerService.updateLocation(formData, beerId, locationId);
      if (selectedBeer.err) {
        throw new Error(selectedBeer.err)
      }

      setBeers(beers.map((b) => (b._id === beerId ? selectedBeer : b)));
      navigate(`/beer/${beerId}/`)

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
              element={<BeerDetail 
                handleDeleteBeer={handleDeleteBeer} 
                handleAddLocation={handleAddLocation}
                user={user}
                handleDeleteLocation={handleDeleteLocation}
                handleEditLocation={handleEditLocation}
              />}
            />
            <Route
              path="/beer/:beerId/edit"
              element={<BeerForm handleEditBeer={handleEditBeer}/>}
            />
            <Route 
              path="/beer/:beerId/location/new"
              element={<LocationForm 
                handleAddLocation={handleAddLocation}
                />}
            />
            <Route
              path="/beer/:beerId/location/:locationId"
              element={<BeerDetail handleDeleteLocation={handleDeleteLocation} />}
            />
            <Route
              path="/beer/:beerId/location/:locationId/edit"
              element={<LocationForm handleEditLocation={handleEditLocation}/>}
            />
            <Route
              path="/users/:userId/beer"
              element={<UserBeerList beers={beers} />}
            />
             
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App