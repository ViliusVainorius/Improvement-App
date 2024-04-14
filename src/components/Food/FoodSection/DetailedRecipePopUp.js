import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { IoMdClose } from "react-icons/io";

const DetailedRecipePopUp = ({ recipe, onClose }) => {
    const [detailedRecipe, setDetailedRecipe] = useState(null);
    const [nutritionId0, setNutritionId0] = useState(null);
    const [nutritionId1, setNutritionId1] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // console.log(recipe)

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const apiKey = 'b6a3af63df10411188e9d9fef62db12b';
                const response = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=true&apiKey=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe details');
                }
                const data = await response.json();
                setDetailedRecipe(data);
                console.log("data", data);

                const nutrientCalories = data.nutrition.nutrients[0];
                if (nutrientCalories) {
                    setNutritionId0(nutrientCalories);
                }

                const nutrientFat = data.nutrition.nutrients[1];
                if (nutrientFat) {
                    setNutritionId1(nutrientFat);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                setIsLoading(false);
            }
        };

        setIsLoading(true);

        fetchRecipeDetails();
    }, [recipe]);

    const handleSaveActions = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you wish to add this recipe to your profile as completed? Calories and other stats will be counted in.')) {
            console.log("Saved recipe calories to user")
            // add a toaster notification when added stats succesfully + add a component which would save the recipe details to profile
            return;
        } else {
            return;
        }
    }

    return (
        <>
            <div><Toaster /></div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && detailedRecipe && (
                <div className="popup-overlay">
                    <div className="recipe-popup-div">
                        <div className="popup-content">
                            <h2>Recipe Details</h2>
                            <button className="close-button" onClick={onClose}><IoMdClose /></button>
                        </div>
                        <div className='detailed-recipe-info-div'>
                            <img src={recipe.image} alt={recipe.title} />
                            <div className="recipe-info-titles-div">
                                <p> <strong>Title:</strong> {recipe.title}</p>
                                {detailedRecipe.nutrition && (
                                    <div className='nutrition-div'> <strong>Nutrition information:</strong>
                                        <div>
                                            Percent Carbs: {detailedRecipe.nutrition.caloricBreakdown.percentCarbs}%
                                        </div>
                                        <div>
                                            Percent Fat: {detailedRecipe.nutrition.caloricBreakdown.percentFat}%
                                        </div>
                                        <div>
                                            Percent Protein: {detailedRecipe.nutrition.caloricBreakdown.percentProtein}%
                                        </div>
                                    </div>
                                )}
                                {nutritionId0 && nutritionId0.amount && nutritionId0.unit &&
                                    <p> <strong>Calories: </strong> {nutritionId0.amount} {nutritionId0.unit} per serving</p>
                                }
                                {nutritionId1 && nutritionId1.amount && nutritionId1.unit &&
                                    <p> <strong>Fat: </strong> {nutritionId1.amount} {nutritionId1.unit} per serving</p>
                                }
                                {detailedRecipe.servings &&
                                    <p> <strong>Recipe servings: </strong> {detailedRecipe.servings}</p>
                                }
                                <p>
                                    <strong>Recipe link:</strong>{" "}
                                    <a href={detailedRecipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                                        Open recipe link in a new tab!
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="used-recipe-div">
                            <button className='used-recipe-btn' onClick={handleSaveActions}>
                                Set as completed recipe!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DetailedRecipePopUp;