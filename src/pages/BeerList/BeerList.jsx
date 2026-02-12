import BeerCard from "../../components/BeerCard/BeerCard";

const BeerList = ({beers}) => {
  return (
    <main>
      <ul>        
        {beers.map((beer) => (
          <li key={beer._id}>
            <BeerCard beer={beer}/>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default BeerList;
