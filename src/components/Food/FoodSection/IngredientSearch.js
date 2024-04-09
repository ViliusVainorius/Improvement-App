import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import ingredientsList from './Ingredients.js';

const IngredientSearch = ({ updateFridgeData, fridgeData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [fridge, setFridge] = useState([]);

    useEffect(() => {
        setFridge(fridgeData);
    }, [fridgeData]);

    const searchLocalIngredients = (query) => {
        const results = ingredientsList.filter(ingredient =>
            ingredient.name.toLowerCase().includes(query.toLowerCase())
        );
        return results;
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.trim();
        setSearchQuery(query);
        if (query.length >= 3) {
            const results = searchLocalIngredients(query);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const addToFridge = (ingredient) => {
        const index = fridge.findIndex(item => item.id === ingredient.id);

        if (index !== -1) {

            const updatedFridge = [...fridge];

            updatedFridge[index].amount += 1;

            setFridge(updatedFridge);

            updateFridgeData(updatedFridge);

        } else {

            setFridge([...fridge, { ...ingredient, amount: 1 }]);

            updateFridgeData([...fridge, { ...ingredient, amount: 1 }]);
        }
    };

    const removeFromFridge = (ingredient) => {
        const index = fridge.findIndex(item => item.id === ingredient.id);

        if (index !== -1) {

            const updatedFridge = [...fridge];

            if (updatedFridge[index].amount > 1) {

                updatedFridge[index].amount -= 1;

            } else {

                updatedFridge.splice(index, 1);
            }

            setFridge(updatedFridge);

            updateFridgeData(updatedFridge);
        }
    };

    return (
        <div>
            <div className='ingredien-search-div'>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search for ingredients"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <label htmlFor="search-input">
                    <FaSearch className='search-icon-div' />
                </label>
            </div>
            {searchResults.length > 0 && (
                <div className='ingredients-search-result-div'>
                    {searchResults.map((ingredient) => (
                        <div
                            className='ingredients-div'
                            key={ingredient.id}
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className='search-ingrediant-plus'
                                onClick={() => addToFridge(ingredient)}
                            >
                                +
                            </div>
                            <div className="ingredient-div">
                                {ingredient.name}
                            </div>
                            <div
                                className='search-ingrediant-minus'
                                onClick={() => removeFromFridge(ingredient)}
                            >
                                -
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className='your-ingredients-div'>
                <h2>Your ingredients</h2>
                <h3>In your fridge you currently have these ingredients:</h3>
                {fridge === undefined && <p>Loading...</p>}
                {fridge.length > 0 ? (
                    <ul>
                        {fridge.map((ingredient) => (
                            <li key={ingredient.id}>
                                <div className='fridge-ingredient-name-div'>
                                    {ingredient.name}
                                </div>
                                <div className='fridge-ingredient-amount-div'>
                                    Amount: {ingredient.amount}
                                </div>
                                <button
                                    className='fridge-ingredient-disc-btn'
                                    onClick={() => removeFromFridge(ingredient)}
                                >
                                    Discard
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No ingredients</p>
                )}
            </div>
            <p>After adding ingredients you can search for recepies and see nutritional values!</p>
        </div>
    );
};

export default IngredientSearch;
