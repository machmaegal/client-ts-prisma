
const SearchResultsList = ({ results, addItem }) => {
    return (
        <div className='flex-column-container scrollable-container list-container'>
            <h2>Found:</h2>
            {results && results.map((ingredient) => (
                <div key={ingredient.name} id='list-item' className='flex-column-container'>
                    <p>{ingredient.name}</p>
                    <button onClick={() => addItem(ingredient)} >Add</button>
                </div>
            ))}
        </div>
    )
}

export default SearchResultsList
