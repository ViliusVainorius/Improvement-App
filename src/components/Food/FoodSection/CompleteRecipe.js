import React, { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/authContext";

const CompleteRecipe = ({ detailedRecipe, calories, fat }) => {

    const { currentUser } = useAuth();
    const [isCompleted, setIsCompleted] = useState(false);

    const saveRecipeToProfile = async () => {

        const userId = currentUser.uid;

        if (!detailedRecipe ||
            calories === null || calories === undefined ||
            fat === null || fat === undefined
            || !userId) {

            toast.error("Error failed to save to profile, refresh the page and try again.");
            return;
        }

        const currentDate = new Date();
        const timestamp = Timestamp.fromDate(currentDate);

        const data = {
            recipe: detailedRecipe,
            calories: calories,
            fat: fat,
            added: timestamp
        };

        const completedRecipeRef = collection(db, `users/${userId}/completedRecipes`);

        try {

            await addDoc(completedRecipeRef, data);

            console.log("completedRecipes collection created with data object - ", data);

        } catch (error) {

            console.error("Error creating completedRecipes collection:", error);

        }


        // if (!completedRecipeSnapshot.empty) {
        //     console.log("completedRecipe collection exists! - ", completedRecipeSnapshot.empty);
        //     // Perform further actions here if the collection exists
        // } else {
        //     console.log("completedRecipe collection does NOT exist! - ", completedRecipeSnapshot.empty);
        //     // Handle the case where the collection does not exist
        // }

    }

    const handleSaveActions = (e) => {

        e.stopPropagation();

        if (isCompleted) {
            toast(
                "Already completed recipe.\n\nIf you wish to complete it again refresh the page!",
                {
                    duration: 6000,
                }
            );
            return;
        }

        if (window.confirm('Are you sure you wish to add this recipe to your profile as completed? Calories and other stats will be counted in.')) {
            console.log("Saved recipe calories to user")

            saveRecipeToProfile();

            setIsCompleted(true);

            toast.success('Successfully completed recipe!')

            return;
        } else {
            return;
        }
    }

    return (
        <button className='used-recipe-btn' onClick={handleSaveActions}>
            Set as completed recipe! {isCompleted && <FaRegCheckCircle style={{ color: 'green' }} />}
        </button>
    );
}

export default CompleteRecipe;