import { Link } from 'react-router';

const UserCard = ({ u }) => {

    return (
        <Link key={u._id} to={`/users/${u._id}/beer`}>
            <article>
                <header>
                    <h2>{u.username}</h2>
                    <p>{u.beerList.length} {u.beerList.length > 1 ? "Beers" : "Beer" }</p>
                </header>
            </article>
        </Link>

    )
}

export default UserCard