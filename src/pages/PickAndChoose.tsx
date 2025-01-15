import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResultsList from '../components/SearchResultsList';
import PickedList from '../components/PickedList';
import NutritionCalculator from '../components/NutritionCalculator';

function PickAndChoose() {
    const [results, setResults] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [showCalculateNutrients, setShowCalculateNutrients] = useState(false);

    const addItem = (item) => {
        if (!selectedItems.some((selected) => selected.name === item.name)) {
            setSelectedItems((prev) => [...prev, item]);
        }
    };

    const removeItem = (item) => {
        setSelectedItems((prev) => prev.filter((selected) => selected.name !== item.name));
    };

    const toggleView = () => {
        setShowCalculateNutrients((prev) => !prev);
    };

    return (
        <div >
            <div id='toggle-button-container'> <button onClick={toggleView}>
                {showCalculateNutrients ? 'Show Picker' : 'Show Calculator'}
            </button>
            </div>
            {showCalculateNutrients ? (
                <>
                    <NutritionCalculator selectedItems={selectedItems} />
                </>
            ) : (
                <>
                    <h2>Search Ingredients</h2>
                    <SearchBar setResults={setResults} />
                    <div className="flex-row-container">
                        <SearchResultsList results={results} addItem={addItem} />
                        <PickedList selectedItems={selectedItems} removeItem={removeItem} />
                    </div>
                </>
            )}
        </div>
    );
}

export default PickAndChoose