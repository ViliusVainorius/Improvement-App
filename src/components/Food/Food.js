import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import NotFound from '../NotFound';
import Navbar from '../bars/Navbar';
import FoodSection from './FoodSection/FoodSection';
import "./food.css";
import FoodNavbar from './FoodNavbar';
import Recepies from './FoodSection/Recepies';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';


const Food = () => {
    const { userLoggedIn, currentUser } = useAuth()
    const history = useHistory();
    const [selectedView, setSelectedView] = useState('YourIngredients');
    const [fridgeData, setFridgeData] = useState([]);

    const userId = currentUser.uid;

    const handleViewChange = async (view) => {
        if (selectedView !== view) {
            setSelectedView(view);
            await fetchFridgeData();
        }
    };

    useEffect(() => {

        fetchFridgeData();

    }, []);

    const fetchFridgeData = async () => {
        try {
            const fridgeDocRef = doc(db, `users/${userId}/fridge`, '0');
            const fridgeDocSnap = await getDoc(fridgeDocRef);

            if (fridgeDocSnap.exists()) {
                const data = fridgeDocSnap.data().fridgeData;
                setFridgeData(data);
                //console.log("fridge data - ", data)

            } else {
                console.log("Fridge document does not exist.");
                await setDoc(fridgeDocRef, { fridgeData: [] }, { merge: true });
                setFridgeData([]);
                console.log("New fridge document created.");
            }
        } catch (error) {
            console.error("Error fetching fridge data:", error);
        }
    };

    return (
        <>
            {!userLoggedIn && <NotFound />}
            {userLoggedIn
                &&
                <>
                    <Navbar />
                    <FoodNavbar onViewChange={handleViewChange} />
                    <div className="calendar-div">
                        {selectedView === 'YourIngredients' && <FoodSection data={fridgeData} />}
                        {selectedView === 'Recepies' && <Recepies data={fridgeData} />}
                        {/* {selectedView === 'appointmentCalendar' && <AppointmentsCalendar events={events} />} */}
                    </div>

                </>
            }
        </>
    );
}

export default Food;