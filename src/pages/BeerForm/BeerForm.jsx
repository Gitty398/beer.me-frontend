// Thomas

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as beerService from "../../services/beerService";

const initialState = {
  name: "",
  image: "",
  category: "",
  location: [
    {
        address: "",
        locationImage: "",
        beerPrice: 0,
        beerRating: 1,
        notes: ""
    }
  ]
};
const BeerForm = ({ handleAddBeer, handleEditBeer }) => {
    const [formData, setFormData] = useState(initialState)
    const { beerId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const beerData = await beerService.show(beerId);
            setFormData(beerData);
        };
        if(beerId) fetchData();
        return () => setFormData(initialState)
    }, [beerId]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (beerId) {
            handleEditBeer(formData, beerId);
        } else {
            handleAddBeer(formData);
        }
        setFormData(initialState);
    };

    return (
        <main>
            <h1>{beerId ? "Edit Beer" : "New Beer"}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="beer-name-input">Name</label>
                <input
                    type="text"
                    id="beer-name-input"
                    name="beer-name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="beer-image-input">Image</label>
                <input 
                    type="text"
                    id="beer-image-input"
                    name="beer-image"
                    value={formData.image}
                    onChange={handleChange}
                />
                <label htmlFor="category-input">Category</label>
                <select
                    required
                    name="category"
                    id="category-input"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Lager">Lager</option>
                    <option value="Ale">Ale</option>
                </select>
                <label htmlFor="location-name-input">Location Name</label>
                <input
                    type="text"
                    id="location-name-input"
                    name="location-name"
                    value={formData.location.name}
                    onChange={handleChange}
                />
                <label htmlFor="location-address-input">Location Address</label>
                <input
                    type="text"
                    id="location-address-input"
                    name="location-address"
                    value={formData.location.address}
                    onChange={handleChange}
                />
                <label htmlFor="beer-price-input">Beer Price</label>
                <input
                    required
                    type="number"
                    id="beer-price-input"
                    name="beer-price"
                    value={formData.location.beerPrice}
                    onChange={handleChange}
                />
                <label htmlFor="beer-rating-input">Beer Rating</label>
                <select
                    required
                    name="beer-rating"
                    id="beer-rating-input"
                    value={formData.location.beerRating}
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
                    value={formData.location.notes}
                    onChange={handleChange}
                />                
            </form>
        </main>
    )
}

export default BeerForm;