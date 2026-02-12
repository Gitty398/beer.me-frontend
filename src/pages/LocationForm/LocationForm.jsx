import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as beerService from "../../services/beerService";

const initialState = {
    name: "",
    address: "",
    locationImage: "",
    beerPrice: 0,
    beerRating: 1,
    notes: "",
    beerCount: 0,
};

const LocationForm = ({ handleAddLocation, handleEditLocation }) => {
    const [formData, setFormData] = useState(initialState)
    const { beerId, locationId } = useParams()
    
    useEffect(() => {
        const fetchData = async () => {
            const locationData = await beerService.showLocation(beerId, locationId);
            setFormData(locationData);
        };
        if (locationId) fetchData();
        return () => setFormData(initialState)
    }, [beerId]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (locationId) {
            handleEditLocation(formData, beerId, locationId);
        } else {
            handleAddLocation(formData, beerId);
        }
        setFormData(initialState);
    };

    return (
        <main className="form-box" >
            <h1>{locationId ? "Edit Location" : "New Location"}</h1>
            <form className="new-form" onSubmit={handleSubmit}>
                <label htmlFor="location-name-input">Location Name</label>
                <input
                    type="text"
                    id="location-name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="location-address-input">Location Address</label>
                <input
                    type="text"
                    id="location-address-input"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <label htmlFor="beer-count-input">Number of Beers</label>
                <input
                    required
                    type="number"
                    id="beer-count-input"
                    name="beerCount"
                    value={formData.beerCount}
                    onChange={handleChange}
                />
                <label htmlFor="beer-price-input">Beer Price</label>
                <input
                    required
                    type="number"
                    id="beer-price-input"
                    name="beerPrice"
                    value={formData.beerPrice}
                    onChange={handleChange}
                />
                <label htmlFor="beer-rating-input">Beer Rating</label>
                <select
                    required
                    id="beer-rating-input"
                    name="beerRating"
                    value={formData.beerRating}
                    onChange={handleChange}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label htmlFor="notes-input">Notes</label>
                <textarea
                    id="notes-input"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />              
                <button className="form-button" type="submit">{locationId ? "Edit Location" : "New Location"}</button>
            </form>
        </main>
    )
}

export default LocationForm;
