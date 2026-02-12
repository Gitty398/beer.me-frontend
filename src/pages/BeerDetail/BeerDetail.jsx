import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as beerService from '../../services/beerService';
import LocationCard from '../../components/LocationCard/LocationCard'

function lager() {
  return 
    <img className='photo' src="../../assets/lager.jpg" alt="Lager" width={200} height={300} />;
}

function ale() {
  return <img className="photo" src="../../assets/ale.jpg" alt="Ale" width={200} height={300} />
    

      
    
  
}

const BeerDetail = ({ handleDeleteBeer, handleDeleteLocation, user }) => {
    const navigate = useNavigate()
    const [beer, setBeer] = useState(null);
    const { beerId } = useParams();

    const fetchBeer = async () => {
            const beerData = await beerService.show(beerId);
            setBeer(beerData);
        };

    const handleEditBeerButton = () => {
        navigate(`/beer/${beerId}/edit`)
    }

    const handleAddLocationButton = () => {
        navigate(`/beer/${beerId}/location/new`)
    }

    const handleEditLocationButton = (beerId, locationId) => {
        navigate(`/beer/${beerId}/location/${locationId}/edit`)
    }

    const onDeleteLocation = async (locationId) => {
        try {
            await handleDeleteLocation(beerId, locationId);
            await fetchBeer();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBeer();
    }, [beerId]);

    if (!beer) return <main>Loading...</main>;

    return (
        <main>
            <section>
                <header>
                    <h1>{beer.name}</h1>
                    <h2>{beer.category}</h2>
                    <div className='container-container'>
                    {beer.category === "Lager" && (
                        <div className='photo-container'>
                            {lager()}
                        </div>
                    )}
                    {beer.category === "Ale" && (
                        <div className='photo-container'>
                            {ale()}
                        </div>
                    )}
                    </div>
                    <p>
                        {`${beer.owner.username} posted on
                        ${new Date(beer.createdAt).toLocaleDateString()}`}
                    </p>
                    {beer.owner._id === user._id && (
                        <>
                        <button onClick={handleEditBeerButton}>Edit Beer</button>
                        <button onClick={() => handleDeleteBeer(beer._id)}>Delete Beer</button>
                        <hr />
                        <button className='location-button' onClick={handleAddLocationButton}>Add Location</button>
                        </>
                    )}
                </header>
                <ul>
                    {beer.location.map((loc, index) => (
                        <li  key={loc._id}>
                            <LocationCard 
                                loc={loc}
                                onDeleteLocation={onDeleteLocation}
                                handleEditLocationButton={handleEditLocationButton}
                                beer={beer}
                                user={user}                                
                            />
                        </li>                        
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default BeerDetail;