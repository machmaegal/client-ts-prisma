import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface NutritionCalculatorProps {
  selectedItems: { name: string; calories: number }[];
}

const NutritionCalculator = ({ selectedItems }: NutritionCalculatorProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [gramInput, setGramInput] = useState<{ [key: string]: number }>({});
  const [calculatedCalories, setCalculatedCalories] = useState<{ [key: string]: number }>({});
  const totalCalories = Object.values(calculatedCalories).reduce((acc, curr) => acc + curr, 0);

  const handleInputChange = (ingredientName: string, value: string) => {
    const grams = parseFloat(value) || 0;
    const totalCalories = (grams / 100) * selectedItems.find(item => item.name === ingredientName)?.calories || 0;

    setGramInput((prev) => ({ ...prev, [ingredientName]: grams }));
    setCalculatedCalories((prev) => ({ ...prev, [ingredientName]: totalCalories }));
  };

  const handleSaveForLater = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const payload = {
        creatorId: user.id,
        ingredients: Object.keys(gramInput).map(name => ({
          name,
          grams: gramInput[name],
          calories: calculatedCalories[name],
        })),
        totalCalories
      };

      const response = await axios.post(`${apiUrl}/recipes`, payload, {
        headers:
        {
          Authorization: `Bearer ${storedToken}`,
        }
      })
      console.log('Data saved successfully:', response.data);
      navigate('/recipes')
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <>
      <div className="flex-column-container scrollable-container list-container">
        <h2>Calculator</h2>
        {selectedItems && selectedItems.map((ingredient) => (
          <div key={ingredient.name} id="list-item" className="flex-column-container">
            <p>{ingredient.name}</p>
            <p>calories/100g: {ingredient.calories} kcal</p>

            <label>grams</label>
            <input
              className="input-field"
              type="number"
              name="grams"
              placeholder="Enter amount in grams"
              value={gramInput[ingredient.name] || ""}
              onChange={(e) => handleInputChange(ingredient.name, e.target.value)}
            />
            <span>
              {calculatedCalories[ingredient.name] !== undefined ?
                `${calculatedCalories[ingredient.name].toFixed(2)} kcal`
                : "0 kcal"}
            </span>
          </div>
        ))}
      </div>
      <div id="total-calories">
        <h3>Total Calories: {totalCalories.toFixed(2)} kcal</h3>
        <button onClick={handleSaveForLater}>Save for later</button>
      </div>
    </>
  );
}

export default NutritionCalculator
