import BeerCard from "../../components/BeerCard/BeerCard";

const BeerList = ({beers}) => {
  
  return (
    <main>
      {beers.map((beer) => (
        <BeerCard beer={beer}/>
      ))}
    </main>
  );
};

export default BeerList;
