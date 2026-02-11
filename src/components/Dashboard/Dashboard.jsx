import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getAllUsers } from "../../services/userService";
import { Link } from 'react-router'

const Dashboard = ({ beers }) => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([])

  // const userList = users.filter((users) => users._id !== user._id)

  const beerList = beers.filter(
    (beer) => String(beer.owner?._id ?? beer.owner) === String(user?._id)
  );

  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await getAllUsers()
      setUsers(allUsers.users)
    }
    fetchData()
  }, [])

  return (
    <main>
      <h1>Welcome, {user.username}!</h1>
      <p>
        Your Beer List:
      </p>
      <ul id="user-ul">

        {beerList.map(beer => <Link key={beer._id} to={`/beer/${beer._id}`}>
          <article>
            <header>
              <h2>{beer.name}</h2>
              <p>
                {`${beer.owner.username} posted on
                ${new Date(beer.createdAt).toLocaleDateString()}`}
              </p>
            </header>
          </article>
        </Link>)}
      </ul>
    </main>
  );
};

{/* <Link key={beer._id} to={`/beer/${beer._id}`}>
  <article>
    <header>
      <h2>{beer.name}</h2>
      <p>
        {`${beer.owner.username} posted on
                ${new Date(beer.createdAt).toLocaleDateString()}`}
      </p>
    </header>
  </article>
</Link> */}





//   return (
//     <main>
//       <h1>Welcome, {user.username}</h1>
//       <p>
//         Other Users
//       </p>
//       <ul id="user-ul">
//         {userList.map(u => <li id="user-card" key={u._id}>{u.username}</li>)}
//       </ul>
//     </main>
//   );
// };


export default Dashboard;
