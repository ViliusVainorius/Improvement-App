import IngredientSearch from "./IngredientSearch";

const FoodSection = () => {
    return (
        <>
            <div className="component-wrapper">
                <div className="search-title-div">
                    <h1>Search food ingredients!</h1>
                    <p>Search and add any food ingredient to your fridge</p>
                </div>
                <IngredientSearch />
            </div>
        </>
    );
}

export default FoodSection;