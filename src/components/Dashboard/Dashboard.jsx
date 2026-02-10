import { useContext, useState, useEffect, use } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getAllUsers } from "../../services/userService";
import { Link } from 'react-router'

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([])
  const userList = users.filter((users) => users._id !== user._id)

  useEffect(()=>{
    const fetchData = async () =>{
        const allUsers = await getAllUsers()
        setUsers(allUsers.users)
    }
    fetchData()
  }, [])
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        Other Users
      </p>
      <ul>
        {userList.map(u => 
          <li key={u._id}>
             <Link to={`/users/${u._id}/beer`}> {u.username}</Link>
          </li>)}
      </ul>
    </main>
  );
};

export default Dashboard;
