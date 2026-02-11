import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getAllUsers } from "../../services/userService";
import { Link } from 'react-router'

const Dashboard = ({ beers }) => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([])

  // const userList = users.filter((users) => users._id !== user._id)

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
        {beers.map(b => <li id="user-card" key={b._id}>{b.name}</li>)}
      </ul>
    </main>
  );
};

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
