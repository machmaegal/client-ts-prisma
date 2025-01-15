import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const RecipeList = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([])
    const storedToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${apiUrl}/recipes`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                    params: { creatorId: user?.id }
                });

                /* console.log('Fetched Recipes:', response.data); */
                setRecipes(response.data);
            } catch (err) {
                console.error('Error fetching recipes:', err);

            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleDeleteRecipe = async (recipeId: string) => {
        try {
            if (!storedToken) {
                console.log('No authentication token found');
                return;
            }

            await axios.delete(`${apiUrl}/recipes/${recipeId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });

            setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => recipe.id !== recipeId)
            );
            console.log('Recipe deleted successfully');
        } catch (err) {
            console.error('Error deleting recipe:', err);
        }
    };

    return (
        <div className='flex-column-container scrollable-container list-container'>
            {loading ? <div>Loading...</div> :
                recipes.map((recipe, index) => (
                    <div key={index} className="recipe-card">
                        <h3>Recipe {index + 1}</h3>
                        <p><strong>Total Calories:</strong> {recipe.totalCalories}kcal</p>

                        <h4>Ingredients:</h4>
                        <div>
                            {recipe.ingredients.map((ingredient: { name: string, grams: number, calories: number }, i: number) => (
                                <div key={i}>
                                    <strong>{ingredient.name}</strong><br />
                                    Grams: {ingredient.grams}g<br />
                                    Calories: {ingredient.calories}kcal
                                </div>
                            ))}
                        </div>
                        <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>

                    </div>
                ))}
        </div>
    )
};

export default RecipeList;
