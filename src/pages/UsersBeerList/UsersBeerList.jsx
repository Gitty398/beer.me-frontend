import { useParams } from 'react-router';
import BeerCard from '../../components/BeerCard/BeerCard';



const UsersBeerList = ({beers}) => {
    const { userId } = useParams()

    const userBeerList = beers.filter((beer) => String(beer.owner?._id ?? beer.owner) === String(userId))

  return (
    <main>
      <ul>
      {userBeerList.map((beer) => (
        <li key={beer._id}>
          <BeerCard beer={beer} />
        </li>

      ))}
      </ul>
    </main>
  );
};

export default UsersBeerList;