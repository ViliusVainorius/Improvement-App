import React, { useState } from "react";
import DetailedRecipePopUp from "./DetailedRecipePopUp";

const RecipeCard = ({ recipe }) => {

    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            {!recipe && <p>No recipes</p>}
            {recipe &&
                <>
                    <div className="recipe-card-div" onClick={handleOpenPopup}>
                        <img src={recipe.image} alt={recipe.title} />
                        <div className="recipe-card-info-div">
                            <p>{recipe.title}</p>
                            <div className="recipe-info-details-div">
                                <p>Missing ingredients: {recipe.missedIngredientCount}</p>
                                <p>Used ingredients: {recipe.usedIngredientCount}</p>
                            </div>
                        </div>
                    </div>
                    {showPopup &&
                        <DetailedRecipePopUp key={recipe.id} recipe={recipe} onClose={handleClosePopup} />
                    }
                </>
            }
        </>
    );
}

export default RecipeCard;