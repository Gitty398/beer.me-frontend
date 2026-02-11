import { Link } from 'react-router';

const BeerList = (props) => {
  return (
    <main className="beer-card">
      {props.beers.map((beer) => (
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

export default BeerList;
