import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as beerService from '../../services/beerService';

const BeerDetail = () => {
    const [beer, setBeer] = useState(null);
    const { beerId } = userParams();
    console.log('beerId', beerId);

    useEffect(() => {
        const fetchBeer = async () => {
        const beerData = await beerService.show(beerId);
        setBeer(beerData);
        };

        fetchBeer();
    }, [beerId]);

    console.log('beer state', beer);
    if (!beer) return <main>Loading...</main>;

    return(
        <main>
            <section>
                <header>
                    <p>{beer.category.toUpperCase}</p>
                    <h1>{beer.name}</h1>
                    <p>
                        {`${beer.owner.username} posted on
                        ${new Date(beer.createdAt).toLocaleDateString()}`}
                    </p>
                </header>
                <p>{beer.location.address}</p>
            </section>
        </main>
    );
};

export default BeerDetail;