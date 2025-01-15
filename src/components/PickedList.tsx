
const PickedList = ({ selectedItems, removeItem }) => {
    return (
        <div className='flex-column-container scrollable-container list-container'>
            <h2>Picked:</h2>
            {selectedItems && selectedItems.map((ingredient) => (
                <div key={ingredient.name}>
                    <p>{ingredient.name}</p>
                    <button onClick={() => removeItem(ingredient)} >X</button>
                </div>
            ))}
        </div>
    )
}

export default PickedList