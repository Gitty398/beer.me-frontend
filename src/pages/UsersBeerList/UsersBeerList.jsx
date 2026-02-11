import { Link, useParams } from 'react-router';
import BeerCard from '../../components/BeerCard/BeerCard';



const UsersBeerList = (props) => {
    const { userId } = useParams()
    const userBeerList = props.beers.filter((beer) => beer.owner._id === userId)
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