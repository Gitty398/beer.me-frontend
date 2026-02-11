import { useParams } from 'react-router';
import BeerCard from '../../components/BeerCard/BeerCard';



const UsersBeerList = ({beers}) => {
    const { userId } = useParams()

    const userBeerList = beers.filter((beer) => String(beer.owner?._id ?? beer.owner) === String(userId))

  return (
    <main>
      {userBeerList.map((beer) => (
        <BeerCard key={beer._id} beer={beer} />
      ))}
    </main>
  );
};

export default UsersBeerList;