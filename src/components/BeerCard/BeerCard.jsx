import { Link } from "react-router"

const BeerCard = ({ beer }) => {

  let beerLocName = beer.location[beer.location.length - 1]
  
    return (
        <Link to={`/beer/${beer._id}`}>
          <article>
            <header className="beer-card-container">
              <h2>{beer.name}</h2>
              <p><strong>Recent Activity</strong></p>
                <div>
                  {`On ${new Date(beer.createdAt).toLocaleDateString()}`}
                  {beer.location.length > 0 && beerLocName ? 
                    <>
                      <p>{`${beer.owner.username} had ${beer.location[beer.location.length - 1].beerCount} beers`}</p>
                      <p>{` at ${beer.location[beer.location.length - 1].name}`}</p>
                    </> : null}                         
                </div>
            </header>
          </article>
        </Link>
      )
}

export default BeerCard