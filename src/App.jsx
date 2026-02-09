import './App.css'
import { useContext, useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router';
// import * as beerService from './services/beerService';
// import Navbar from './components/Navbar/Navbar';
// import SignUpForm from './components/SignUpForm/SignUpForm';
// import SignInForm from './components/SignInForm/SignInForm';
// import LandingPage from './components/LandingPage/LandingPage';
// import Dashboard from './components/Dashboard/Dashboard';
// import BeerList from './pages/BeerList/BeerList';
// import BeerDetail from './pages/BeerDetail/BeerDetail';
// import BeerForm from './pages/BeerForm/BeerForm';


function App() {
  const [beers, setBeers] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {

  }, []);

  return (
    <>
      {/* <Navbar />
      <Routes>
        
      </Routes> */}
      <h1>Hello world!</h1>
    </>
  )
}

export default App
