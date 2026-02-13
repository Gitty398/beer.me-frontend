
import UserCard from '../../components/UserCard/UserCard';

import { Link, useParams } from 'react-router';
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"

const UserList = ({ users, beers }) => {
    const { user } = useContext(UserContext)

    const filteredUsers = users.filter((u) => String(u._id) !== String(user._id))

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {filteredUsers.map((u) => (
                    <li key={u._id}>
                        <UserCard u={u} beers={beers} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
