import { useState, useRef } from "react";
import IngredientSearch from "./IngredientSearch";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/authContext";

const FoodSection = () => {
    const [fridgeData, setFridgeData] = useState([]);
    const prevFridgeDataRef = useRef([]);
    const { currentUser } = useAuth();

    const userId = currentUser.uid;

    const updateFridgeData = (newFridgeData) => {
        prevFridgeDataRef.current = fridgeData; // Update the ref to store the current fridgeData
        setFridgeData(newFridgeData);
    };

    const saveToFridgeCollection = async () => {
        if (JSON.stringify(prevFridgeDataRef.current) !== JSON.stringify(fridgeData)) {

            // console.log(fridgeData, "vs", prevFridgeDataRef.current)

            try {
                const fridgeDocRef = doc(db, `users/${userId}/fridge`, '0');

                // Update the document with the new fridge data
                await updateDoc(fridgeDocRef, {
                    // Replace 'fridge data' with the actual data you want to update
                    // For example: fridgeData
                    fridgeData: fridgeData
                });

                prevFridgeDataRef.current = fridgeData;

                console.log("Fridge data updated successfully - ", fridgeData);
            } catch (error) {
                console.error("Error updating fridge data:", error);
            }

        } else {
            console.log("No changes in fridge data");
        }
    };

    return (
        <>
            <div className="component-wrapper">
                <div className="search-title-div">
                    <h1>Search food ingredients!</h1>
                    <p>Search and add any food ingredient to your fridge</p>
                </div>
                <IngredientSearch updateFridgeData={updateFridgeData} />
                <button
                    className="save-to-fridge-btn"
                    onClick={saveToFridgeCollection}
                >
                    Save
                </button>
            </div>
        </>
    );
}

export default FoodSection;
