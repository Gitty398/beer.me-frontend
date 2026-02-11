import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as beerService from "../../services/beerService";

const initialState = {
    name: "",
    image: "",
    category: "Lager",
};

const BeerForm = ({ handleAddBeer, handleEditBeer }) => {
    const [formData, setFormData] = useState(initialState)
    const { beerId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const beerData = await beerService.show(beerId);
            setFormData(beerData);
        };
        if (beerId) fetchData();
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
            <form className="new-form" onSubmit={handleSubmit}>
                <label htmlFor="beer-name-input">Name</label>
                <input
                    type="text"
                    id="beer-name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="beer-image-input">Image</label>
                <input
                    type="text"
                    id="beer-image-input"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
                <label htmlFor="category-input">Category</label>
                <select
                    required
                    id="category-input"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Lager">Lager</option>
                    <option value="Ale">Ale</option>
                </select>
                <button type="submit">Beer Me</button>
            </form>
        </main>
    )
}

export default BeerForm;
