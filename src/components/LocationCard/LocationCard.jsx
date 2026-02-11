

const LocationCard = ({
    loc,
    onDeleteLocation,
    handleEditLocationButton,
    user,
    beer
}) => {

    return (
        <div key={loc._id}>
            <h3>Name: {loc.name}</h3>
            <p>Address: {loc.address}</p>
            <p>Price: {loc.beerPrice}</p>
            <p>Rating: {loc.beerRating}</p>
            <p>Notes: {loc.notes}</p>
            <p>Last Updated on {new Date(loc.createdAt).toLocaleDateString()}</p>
            {beer.owner._id === user._id && (
                <>
                {console.log(beer.owner)}
                <button onClick={() => handleEditLocationButton(beer._id, loc._id)}>Edit Location</button>
                <button onClick={() => onDeleteLocation(loc._id)}>Delete Location</button>
                </>
             )} 
        </div>
    )
}

export default LocationCard
