import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
// import { getAllUsers } from "../../services/userService";
import { Link } from 'react-router'
import BeerCard from "../BeerCard/BeerCard";

const Dashboard = ({ beers }) => {
  const { user } = useContext(UserContext);
  // const [users, setUsers] = useState([])

  const beerList = beers.filter(
    (beer) => String(beer.owner?._id ?? beer.owner) === String(user?._id)
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const allUsers = await getAllUsers()
  //     setUsers(allUsers.users)
  //   }
  //   fetchData()
  // }, [])

  return (
    <main>
      <h1>Welcome, {user.username}!</h1>
      <Link to="/beer/new"><button>Add a Beer!</button></Link>
      {beerList.length > 0 && (
        <>
          <p>
            <strong>Your Beer List</strong>
          </p>
          <div>
          <ul id="user-ul">
            {beerList.map(beer => 
             <li key={beer._id}>
               <BeerCard beer={beer} />
             </li>
            )}
          </ul>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
