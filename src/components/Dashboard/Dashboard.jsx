// Mathew

import { useContext, useState, useEffect, use } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getAllUsers } from "../../services/userService";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([])

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
        This is the dashboard page where you can see a list of all the users
      </p>
      <ul>
        {users.map(u => <li key={u._id}>{u.username}</li>)}
      </ul>
    </main>
  );
};

export default Dashboard;