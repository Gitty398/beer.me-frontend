// Thomas

import { Link } from 'react-router';

const BeerList = (props) => {
  return (
    <main>
      {props.beers.map((beer) => (
        <Link key={beer._id} to={`/beers/${beer._id}`}>
          <article>
            <header>
              <h2>{beer.name}</h2>
              <p>
                {`${beer.owner.username} posted on
                ${new Date(beer.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{beer.location.address}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default BeerList;
