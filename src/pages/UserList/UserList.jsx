
import UserCard from '../../components/UserCard/UserCard';

const UserList = ({ users }) => {
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
