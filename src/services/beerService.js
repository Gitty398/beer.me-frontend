const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/beer`;


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

// export const addComment = async (comment, beerId) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${beerId}/locations/`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: JSON.stringify(comment),
//         });

//         const data = res.json();

//         return data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// export const deleteComment = async (commentId, beerId) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${beerId}/comments/${commentId}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         });
//         const data = res.json();

//         return data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// export const updateComment = async (commentId, beerId, comment) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${beerId}/beers/${commentId}`, {
//             method: "PUT",
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 "Content-Type": 'application/json'
//             },
//             body: JSON.stringify(comment)
//         });
//         const data = res.json();

//         return data;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };
