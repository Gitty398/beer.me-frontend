import { Link } from 'react-router';

const UserCard = ({ u }) => {

    return (
        <Link key={u._id} to={`/users/${u._id}/beer`}>
            <article>
                <header className='user-card' >
                    <h3><strong>{u.username}</strong></h3>
                    <p>{u.beerList.length} {u.beerList.length > 1 ? "Beers" : "Beer" }</p>
                </header>
            </article>
        </Link>
    )
}

export default UserCard