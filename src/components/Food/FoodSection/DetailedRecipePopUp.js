import React from 'react';
import { IoMdClose } from "react-icons/io";

const DetailedRecipePopUp = ({ recipe, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="recipe-popup-div">
                <div className="popup-content">
                    <h2>Recipe Details</h2>
                    <button className="close-button" onClick={onClose}><IoMdClose /></button>
                </div>
                <div className='detailed-recipe-info-div'>
                    <div className="recipe-info-titles-div">
                        <p>Title:</p>
                        <p>Recipe: </p>
                    </div>
                    Hello worldnfajnggigaerjgo pesirbgngosea irujugboesirbgoesrgboegosi grbgesgr
                </div>
            </div>
        </div>
    );
}

export default DetailedRecipePopUp;