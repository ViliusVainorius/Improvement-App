import React, { useState } from 'react';
import RecepiesSearch from './RecepiesSearch';

const Recepies = ({ data }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    // const [errorMsg, setErrorMsg] = useState("");

    const handleIngredientChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedIngredients((prevSelected) => [...prevSelected, value]);
            // setErrorMsg("");
        } else {
            setSelectedIngredients((prevSelected) => prevSelected.filter((item) => item !== value));
        }
    };



    // console.log("selected items: ", selectedIngredients)

    return (
        <div className="component-wrapper">
            <div className="titles-div">
                <h2>Find recipes by your ingredients!</h2>
                <p>Select wanted ingredients and press search to find different recipes by your selected ingredients!</p>
            </div>
            <p className='title-p'>Your ingredients:</p>
            <div className='select-ingredient-div'>
                {data.map((ingredient) => (
                    <div
                        key={ingredient.id}
                        className={`selected-ingredient-item-div ${selectedIngredients.includes(ingredient.name) ? 'checked' : ''}`}
                    >
                        <input
                            type="checkbox"
                            id={ingredient.id}
                            value={ingredient.name}
                            checked={selectedIngredients.includes(ingredient.name)}
                            onChange={handleIngredientChange}
                        />
                        <label htmlFor={ingredient.id}>{ingredient.name}</label>
                    </div>
                ))}
            </div>
            {/* {errorMsg && <div className='error-msg-div' > {errorMsg} </div>} */}
            <RecepiesSearch ingredients={selectedIngredients} />
        </div>
    );
};

export default Recepies;
