import { Link, useParams } from 'react-router';



const UsersBeerList = (props) => {
    const { userId } = useParams()
    const userBeerList = props.beers.filter((beer) => beer.owner._id === userId)
  return (
    <main>
      {userBeerList.map((beer) => (
        <Link key={beer._id} to={`/beer/${beer._id}`}>
          <article>
            <header>
              <h2>{beer.name}</h2>
              <p>
                {`${beer.owner.username} posted on
                ${new Date(beer.createdAt).toLocaleDateString()}`}
              </p>
            </header>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default UsersBeerList;