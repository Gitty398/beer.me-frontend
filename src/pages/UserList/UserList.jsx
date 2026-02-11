
import UserCard from '../../components/UserCard/UserCard';

import { Link, useParams } from 'react-router';
import {useContext} from "react"
import {UserContext} from "../../contexts/UserContext"

const UserList = ({users}) => {
    const { user } = useContext(UserContext)

    const filteredUsers = users.filter((u)=> String(u._id) !== String(user._id))
    
    return (
        <ul>
            {users.map((u) => (
                <li key={u._id}>
                    <UserCard u={u} />
                </li>
            ))}
        </ul>
    );
};

export default UserList;
