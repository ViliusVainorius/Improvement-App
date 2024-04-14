import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

const RecepiesSearch = ({ ingredients }) => {
    // const [isSearched, setIsSearched] = useState(false);
    // const [toggleSearch, setToggleSearch] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [activeQuery, setActiveQuery] = useState("");
    const [fetchedRecipes, setFetchedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {

        if (ingredients.length < 1) {
            setErrorMsg("In order to search for recepies please select at least one ingredient!");
            return;
        }

        setErrorMsg("");
        // console.log("selected: ", ingredients);

        const queryString = ingredients.map(ingredient =>
            ingredient.toLowerCase().replace(/\s/g, '+')
        ).join(',');

        // console.log("query: ", queryString);

        if (queryString === activeQuery) {
            return;
        }

        setActiveQuery(queryString)
        // console.log("fetching recepies")

        getRecipesByIngredients(queryString)
            .then(recipes => {
                // console.log('Recipes:', recipes);
                setFetchedRecipes(recipes);
                // Handle recipes here
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error
            });
    };

    async function getRecipesByIngredients(queryString) {
        try {
            const apiKey = "b6a3af63df10411188e9d9fef62db12b";

            const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${queryString}`);

            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }

            const data = await response.json();

            return data;

        } catch (error) {
            console.error('Error fetching recipes:', error);
            return null;
        }
    }

    // console.log(ingredients)
    return (
        <>
            <button className="search-btn" type="button" onClick={handleSearch}>Search</button>
            {errorMsg && <div className='error-msg-div' > {errorMsg} </div>}
            {!errorMsg &&
                <>
                    <h2>Search results: </h2>
                    <div className="recepies-component-div">
                        {fetchedRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                </>

            }
        </>
    );
}

export default RecepiesSearch;