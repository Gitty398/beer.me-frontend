import { Link } from "react-router"

const BeerCard = ({ beer }) => {

  let beerLocName = beer.location[beer.location.length - 1]
  
    return (
        <Link key={beer._id} to={`/beer/${beer._id}`}>
          <article>
            <header className="beer-card-container">
              <h2>{beer.name}</h2>
              <p><strong><u>Recent Activity</u></strong></p>
                <div>
                  {beer.location.length > 0 && beerLocName ? 
                    <>
                      <p>{`${beer.owner.username} had ${beer.location[beer.location.length - 1].beerCount} `}{beer.location[beer.location.length - 1].beerCount === 1 ? "Beer" : "Beers" }</p>
                      <p>{` at ${beer.location[beer.location.length - 1].name}`}</p>
                      <p>{`On ${new Date(beer.createdAt).toLocaleDateString()}`}</p>
                    </> : <p>No recent locations</p>}                         
                </div>
            </header>
          </article>
        </Link>
      )
}

export default BeerCard