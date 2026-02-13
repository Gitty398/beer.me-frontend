import { Link } from 'react-router';

const UserCard = ({ u, beers }) => {
    const beerCount = beers.filter(
        (b) => String(b.owner?._id ?? b.owner) === String(u._id)
    ).length;

    return (
        <Link key={u._id} to={`/users/${u._id}/beer`}>
            <article>
                <header className='user-card' >
                    <h3><strong>{u.username}</strong></h3>
                    <p>{beerCount} {beerCount === 1 ? "Beer" : "Beers"}</p>
                </header>
            </article>
        </Link>
    )
}

export default UserCard