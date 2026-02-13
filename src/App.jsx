import { useContext, useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router';
import * as beerService from './services/beerService';
import * as userService from "./services/userService";
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
import UserList from "./pages/UserList/UserList"

function App() {
  const [beers, setBeers] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeers = async () => {
      const beersData = await beerService.index();
      setBeers(beersData);

      const usersData = await userService.getAllUsers();
      setUsers(usersData.users ?? usersData);

    }

    if (user) fetchBeers();
  }, [user, beers]);

  const handleAddBeer = async (formData) => {
    try {
      const res = await beerService.create(formData);
      if (res.err) {
        throw new Error(res.err);
      }

      const newBeer = res.beer ?? res;

      setBeers((prev) => [...prev, newBeer]);
      navigate(`/beer/${newBeer._id}`);

    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteBeer = async (beerId) => {
    try {
      const res = await beerService.deleteBeer(beerId);
      if (res.err) {
        throw new Error(res.err);
      }

      setBeers(prev =>
        prev.filter((beer) => beer._id !== beerId)
      );
      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }

  const handleEditBeer = async (formData, beerId) => {
    try {
      const res = await beerService.updateBeer(formData, beerId);
      if (res.err) {
        throw new Error(res.err)
      }

      const updatedBeer = res.beer ?? res;

      setBeers(prev => prev.map((b) => (b._id === beerId ? updatedBeer : b)));

      navigate(`/beer/${beerId}`)

    } catch (error) {
      console.log(error)
    }
  }

  const handleAddLocation = async (formData, beerId) => {
    try {
      const res = await beerService.createLocation(formData, beerId);
      if (res.err) {
        throw new Error(res.err)
      }

      const updatedBeer = res.beer ?? res;

      setBeers(prev => prev.map((b) => (b._id === beerId ? updatedBeer : b)));

      navigate(`/beer/${beerId}`)

    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteLocation = async (beerId, locationId) => {
    try {
      const res = await beerService.deleteLocation(beerId, locationId);
      if (res.err) {
        throw new Error(res.err);
      }

      const updatedBeer = res.beer ?? res;

      setBeers(prev => prev.map((b) => (b._id === beerId ? updatedBeer : b)));
      navigate(`/beer/${beerId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditLocation = async (formData, beerId, locationId) => {
    try {
      const res = await beerService.updateLocation(formData, beerId, locationId);
      if (res.err) {
        throw new Error(res.err)
      }

      const updatedBeer = res.beer ?? res;

      setBeers(prev => prev.map((b) => (b._id === beerId ? updatedBeer : b)));
      navigate(`/beer/${beerId}`)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <Dashboard beers={beers} /> : <LandingPage />} />
        {user ? (
          <>
            <Route path='/beer' element={<BeerList beers={beers} />} />
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
              element={<BeerForm handleEditBeer={handleEditBeer} />}
            />
            <Route
              path="/users"
              element={<UserList users={users} beers={beers} />}
            />
            <Route
              path="/beer/:beerId/location/new"
              element={<LocationForm
                handleAddLocation={handleAddLocation}
              />}
            />
            <Route
              path="/beer/:beerId/location/:locationId/edit"
              element={<LocationForm handleEditLocation={handleEditLocation} />}
            />
            <Route
              path="/users/:userId/beer"
              element={<UserBeerList
                beers={beers}
                users={users}
              />}
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