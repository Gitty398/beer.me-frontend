import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as beerService from '../../services/beerService';
// import BeerForm from '../BeerForm/BeerForm';

const BeerDetail = ({ handleDelete }) => {
    const navigate = useNavigate()
    const [beer, setBeer] = useState(null);
    const { beerId } = useParams();

    const handleEditButton = () => {
        navigate(`/beer/${beerId}/edit`)
    }
    const handleDeleteButton = () => {
        handleDelete()
    }

    useEffect(() => {
        const fetchBeer = async () => {
            const beerData = await beerService.show(beerId);
            setBeer(beerData);
        };

        fetchBeer();
    }, [beerId]);

    if (!beer) return <main>Loading...</main>;

    return (
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
                        </div>
                    ))}
                    <button onClick={handleEditButton}>Edit Beer</button>
                    <button onClick={handleDeleteButton}>Delete Beer</button>
                </div>
            </section>
        </main>
    );
};

export default BeerDetail;