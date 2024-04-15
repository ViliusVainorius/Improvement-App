import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import TasksPieChart from "./TasksPieChart";

const ProfileStats = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [taskAmount, setTaskAmount] = useState(null);
    const [completedTaskAmount, setCompletedTaskAmount] = useState(null);
    const [incompletedTaskAmount, setIncompletedTaskAmount] = useState(null);
    const [stravaSyncedAmount, setStravaSyncedAmount] = useState(null);
    const [caloriesBurned, setCaloriesBurned] = useState(null);

    const [events, setEvents] = useState([]);
    const [eventsAmount, setEventsAmount] = useState(null);

    const [fridge, setFridge] = useState([]);
    const [fridgeAmount, setFridgeAmount] = useState(null);

    const [recipes, setRecipes] = useState([]);
    const [recipeAmount, setRecipeAmount] = useState(null);

    const userId = user.uid;

    useEffect(() => {

        const fetchTasks = async () => {

            try {
                const tasksCollectionRef = collection(db, `users/${userId}/tasks`);

                const querySnapshot = await getDocs(tasksCollectionRef);

                const fetchedTasks = [];

                querySnapshot.forEach((doc) => {

                    fetchedTasks.push({ id: doc.id, ...doc.data() });

                });

                // console.log(fetchedTasks)

                setTaskAmount(fetchedTasks.length)

                setCompletedTaskAmount(getCompletedTasksAmount(fetchedTasks));

                setStravaSyncedAmount(getStravaSyncedAmount(fetchedTasks));

                setIncompletedTaskAmount(getNotCompletedTaskAmount(fetchedTasks));

                setCaloriesBurned(getCaloriesBurned(fetchedTasks));

                setTasks(fetchedTasks);
                console.log("fetched")

            } catch (error) {

                console.error('Error fetching tasks:', error);

            }
        };

        const fetchEvents = async () => {

            try {
                const eventsCollectionRef = collection(db, `users/${userId}/events`);

                const querySnapshot = await getDocs(eventsCollectionRef);

                const fetchedEvents = [];

                querySnapshot.forEach((doc) => {

                    fetchedEvents.push({ id: doc.id, ...doc.data() });

                });

                // console.log(fetchedEvents)

                setEventsAmount(fetchedEvents.length)


                setEvents(fetchedEvents);
                console.log("fetched")

            } catch (error) {

                console.error('Error fetching tasks:', error);

            }
        };

        const fetchFood = async () => {

            try {
                const fridgeCollectionRef = collection(db, `users/${userId}/fridge`);

                const querySnapshot = await getDocs(fridgeCollectionRef);

                const fetchedFridge = [];

                querySnapshot.forEach((doc) => {

                    fetchedFridge.push({ id: doc.id, ...doc.data() });

                });

                // console.log(fetchedFridge[0].fridgeData)

                setFridgeAmount(getIngredientsCount(fetchedFridge[0].fridgeData))

                setFridge(fetchedFridge[0].fridgeData);
                console.log("fetched")

            } catch (error) {

                console.error('Error fetching tasks:', error);

            }
        };

        const fetchRecipes = async () => {

            try {
                const recipeCollectionRef = collection(db, `users/${userId}/completedRecipes`);

                const querySnapshot = await getDocs(recipeCollectionRef);

                const fetchedRecipes = [];

                querySnapshot.forEach((doc) => {

                    fetchedRecipes.push({ id: doc.id, ...doc.data() });

                });

                // console.log(fetchedRecipes)

                setRecipeAmount(fetchedRecipes.length)

                setRecipes(fetchedRecipes);
                console.log("fetched")

            } catch (error) {

                console.error('Error fetching tasks:', error);

            }
        };


        fetchTasks();
        fetchEvents();
        fetchFood();
        fetchRecipes();

    }, [userId]);

    const getCompletedTasksAmount = (tasks) => {

        const completedTasks = tasks.filter(task => task.completed === true);

        return completedTasks.length;
    };

    const getStravaSyncedAmount = (tasks) => {

        const syncedAmount = tasks.filter(task => task.isStravaActivitySynced === true);

        return syncedAmount.length;
    }

    const getNotCompletedTaskAmount = (tasks) => {
        const incompletedTasks = tasks.filter(task => task.completed !== true);

        return incompletedTasks.length;
    }

    // TO BE COMPLETED -------------------------------------------------------
    const getCaloriesBurned = (tasks) => {
        const stravaTasks = tasks.filter(task => task.isStravaActivitySynced === true);

        if (stravaTasks.length !== 0)

            return 0;
    }
    // -----------------------------------------------------------------------

    const getIngredientsCount = (fridge) => {

        if (!fridge || !fridge.length)
            return 0;

        const totalCount = fridge.reduce((count, ingredient) => {

            if (ingredient.hasOwnProperty('amount')) {
                return count + ingredient.amount;
            } else {
                return count;
            }
        }, 0);

        return totalCount;
    }


    if (tasks.length === 0 || events.length === 0 || fridge.length === 0 || recipes.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="stats">
            <div style={{ width: "100%" }}>
                <h3>Tasks</h3>
                <div className="tasks-amount-div">
                    <div className="tasks-amount">
                        <p>Created: </p>
                        <p>{taskAmount}</p>
                    </div>
                    <div className="tasks-amount">
                        <p>Completed: </p>
                        <p>{completedTaskAmount}</p>
                    </div>
                    <div className="tasks-amount">
                        <p>Incomplete: </p>
                        <p>{incompletedTaskAmount}</p>
                    </div>
                    <div className="tasks-amount">
                        <p>Strava synced: </p>
                        <p>{stravaSyncedAmount}</p>
                    </div>
                    {/* <div className="tasks-amount">
                        <p>Calories burned in activities: </p>
                        <p>{stravaSyncedAmount}</p>
                    </div>
                    <div className="tasks-amount">
                        <p>Strava synced tasks amount: </p>
                        <p>{stravaSyncedAmount}</p>
                    </div> */}
                </div>
            </div>
            <div className="pie-chart" >
                <TasksPieChart completed={completedTaskAmount} incompleted={incompletedTaskAmount} />
            </div>
            <div style={{ width: "100%" }}>
                <h3>Events</h3>
                <div className="tasks-amount-div">
                    <div className="tasks-amount">
                        <p>Created: </p>
                        <p>{eventsAmount}</p>
                    </div>
                </div>
            </div>
            <div style={{ width: "100%" }}>
                <h3>Food</h3>
                <div className="tasks-amount-div">
                    <div className="tasks-amount">
                        <p>Completed recipes: </p>
                        <p>{recipeAmount}</p>
                    </div>
                    <div className="tasks-amount">
                        <p>Total ingredients: </p>
                        <p>{fridgeAmount}</p>
                    </div>
                </div>
            </div>
            <div style={{ width: "100%" }}>
                <h3>Health</h3>
                <div className="tasks-amount-div">
                    <div className="tasks-amount">
                        <p>Calories burned by activities: </p>
                        {/* <p>{recipeAmount}</p> */}
                    </div>
                    <div className="tasks-amount">
                        <p>Total calories intake by food: </p>
                        {/* <p>{fridgeAmount}</p> */}
                    </div>
                    <div className="tasks-amount">
                        <p>Total fat intake by food: </p>
                        {/* <p>{fridgeAmount}</p> */}
                    </div>
                    <div className="tasks-amount">
                        <p>Total calories burned: </p>
                        {/* <p>{fridgeAmount}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileStats;