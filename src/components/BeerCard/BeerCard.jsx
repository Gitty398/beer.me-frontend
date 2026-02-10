import { Link } from "react-router"

const BeerCard = ({ beer }) => {
    return (
        <Link key={beer._id} to={`/beer/${beer._id}`}>
          <article>
            <header>
              <h2>{beer.name}</h2>
              <p>
                {`${beer.owner.username} drank on
                ${new Date(beer.createdAt).toLocaleDateString()}`}
              </p>
            </header>
          </article>
        </Link>
      )
}

export default BeerCard