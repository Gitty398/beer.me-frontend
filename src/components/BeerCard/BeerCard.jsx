import { Link } from "react-router"

const BeerCard = ({ beer }) => {

  let beerLocName = beer.location[beer.location.length - 1];

    return (
        <Link key={beer._id} to={`/beer/${beer._id}`}>
          <article>
            <header>
              <h2>{beer.name}</h2>              
                {`${beer.owner.username} drank on
                ${new Date(beer.createdAt).toLocaleDateString()}`}
                {beer.location.length > 0 && beerLocName ? <p>{`at ${beer.location[beer.location.length - 1].name}`}</p> : <p></p>}              
            </header>
          </article>
        </Link>
      )
}

export default BeerCard