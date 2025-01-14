import { useState } from 'react'
import axios from 'axios'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const apiUrl = import.meta.env.VITE_API_URL;

    const getIngredients = async (value: string) => {
        try {
            const storedToken = localStorage.getItem("authToken");
            const response = await axios.get(`${apiUrl}/ingredients`, { headers: { Authorization: `Bearer ${storedToken}` } });
            const results = response.data.filter((ingredient: { name: string }) => {
                return value &&
                    ingredient &&
                    ingredient.name &&
                    ingredient.name.toLowerCase().includes(value.toLowerCase());
            });
            console.log(results);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

    const handleChange = (value: string) => {
        setSearchTerm(value)
        getIngredients(value)
    }
    return (
        <div>
            <input
                value={searchTerm}
                placeholder='search sth'
                onChange={(e) => handleChange(e.target.value)}></input>
        </div>
    )
}

export default SearchBar