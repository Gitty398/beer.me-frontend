const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/beer`;


// Index for Beers
export const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Show Beer
export const show = async (beerId) => {
    try {
        const res = await fetch(`${BASE_URL}/${beerId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};


// Create Beer
export const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};


// Delete Beer
export const deleteBeer = async (beerId) => {
    try {
        const res = await fetch(`${BASE_URL}/${beerId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await res.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update Beer
export const updateBeer = async (beer, beerId) => {
    try {
        const res = await fetch(`${BASE_URL}/${beerId}/`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(beer),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Show Location
export const showLocation = async (beerId, locationId) => {
    try {
        const res = await fetch(`${BASE_URL}/${beerId}/location/${locationId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Create Location
export const createLocation = async (formData, beerId) => {
    try {
        const res = await fetch(`${BASE_URL}/${beerId}/location`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};