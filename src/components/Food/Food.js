import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import NotFound from '../NotFound';
import Navbar from '../bars/Navbar';
import FoodSection from './FoodSection/FoodSection';
import "./food.css";

const Food = () => {
    const { userLoggedIn } = useAuth()
    const history = useHistory();

    return (
        <>
            {!userLoggedIn && <NotFound />}
            {userLoggedIn
                &&
                <>
                    <Navbar />
                    <FoodSection />
                </>
            }
        </>
    );
}

export default Food;