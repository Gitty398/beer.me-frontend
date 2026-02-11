import { Link } from 'react-router';

const UserList = ({ users }) => {
    return (
        <main className="beer-card">
            {users.map((u) => (
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
