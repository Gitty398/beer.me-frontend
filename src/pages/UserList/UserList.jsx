
import { Link, useParams } from 'react-router';
import {useContext} from "react"
import {UserContext} from "../../contexts/UserContext"

const UserList = ({users}) => {
    const { user } = useContext(UserContext)

    const filteredUsers = users.filter((u)=> String(u._id) !== String(user._id))
    
    return (
        <main className="beer-card">
           
            {filteredUsers.map((u) => (
                <Link key={u._id} to={`/users/${u._id}/beer`}>
                    <article>
                        <header>
                            <h2>{u.username}</h2>
                        </header>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default UserList;
