import { useParams } from 'react-router';
import BeerCard from '../../components/BeerCard/BeerCard';



const UsersBeerList = ({ beers, users }) => {
    const { userId } = useParams()
    const user = users.find((u) => u._id === userId)

    const userBeerList = beers.filter((beer) => String(beer.owner?._id ?? beer.owner) === String(userId))

  return (
    <main>
      <h1>{user?.username}'s Beer List</h1>
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