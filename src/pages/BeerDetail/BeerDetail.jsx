import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as beerService from '../../services/beerService';

const BeerDetail = ({ handleDeleteBeer, handleDeleteLocation, user }) => {
    const navigate = useNavigate()
    const [beer, setBeer] = useState(null);
    const { beerId } = useParams();

    const handleEditBeerButton = () => {
        navigate(`/beer/${beerId}/edit`)
    }

    const handleAddLocationButton = () => {
        navigate(`/beer/${beerId}/location/new`)
    }

    const handleEditLocationButton = (locationId) => {
        navigate(`/beer/${beerId}/location/${locationId}/edit`)
    }

    useEffect(() => {
        const fetchBeer = async () => {
        const beerData = await beerService.show(beerId);
        setBeer(beerData);
        };

        fetchBeer();
    }, [beerId]);

    if (!beer) return <main>Loading...</main>;

    return(
        <main>
            <section>
                <header>
                    <h1>{beer.name}</h1>
                    {/* Beer Image */}
                    <p>{beer.category}</p>
                    <p>
                        {`${beer.owner.username} posted on
                        ${new Date(beer.createdAt).toLocaleDateString()}`}
                    </p>
                    {beer.owner._id === user._id && (
                        <>
                        <button onClick={handleAddLocationButton}>Add Location</button>
                        <button onClick={handleEditBeerButton}>Edit Beer</button>
                        <button onClick={() => handleDeleteBeer(beer._id)}>Delete Beer</button>
                        </>
                    )}
                </header>
                <div>
                    {beer.location.map((loc, index) => (
                        <div key={loc._id}>
                                <h3>Name: {beer.location[index].name}</h3>
                                <p>Address: {beer.location[index].address}</p>
                                <p>Price: {beer.location[index].beerPrice}</p>
                                <p>Rating: {beer.location[index].beerRating}</p>
                                <p>Notes: {beer.location[index].notes}</p>
                                <p>Last Updated on {new Date(loc.createdAt).toLocaleDateString()}</p>
                            {beer.owner._id === user._id && (
                                <>
                                <button onClick={() => handleEditLocationButton(loc._id)}>Edit Location</button>
                                <button onClick={() => handleDeleteLocation(loc._id)}>Delete Location</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default BeerDetail;