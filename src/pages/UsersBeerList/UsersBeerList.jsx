import { Link, useParams } from 'react-router';
import BeerCard from '../../components/BeerCard/BeerCard';



const UsersBeerList = (props) => {
    const { userId } = useParams()
    const userBeerList = props.beers.filter((beer) => beer.owner._id === userId)
  return (
    <main>
      {userBeerList.map((beer) => (
        <BeerCard beer={beer} />
      ))}
    </main>
  );
};

export default UsersBeerList;