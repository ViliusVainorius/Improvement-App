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

    const [caloriesBurned, setCaloriesBurned] = useState(-1);
    const [foodCalories, setFoodCalories] = useState(0);
    const [foodFat, setFoodFat] = useState(0);

    const [events, setEvents] = useState([]);
    const [eventsAmount, setEventsAmount] = useState(null);

    const [fridge, setFridge] = useState([]);
    const [fridgeAmount, setFridgeAmount] = useState(null);

    const [recipes, setRecipes] = useState([]);
    const [recipeAmount, setRecipeAmount] = useState(null);

    const [stravaResync, setStravaResync] = useState("");

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

                try {
                    const caloriesBurned = await getCaloriesBurned(fetchedTasks);
                    setCaloriesBurned(caloriesBurned);
                } catch (error) {
                    console.error(error);
                }


                setTasks(fetchedTasks);
                // console.log("fetched")

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
                // console.log("fetched")

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
                // console.log("fetched")

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

                setRecipeAmount(fetchedRecipes.length)

                setFoodCalories(getFoodCaloriesIntakeAmount(fetchedRecipes));

                setFoodFat(getFoodFatIntakeAmount(fetchedRecipes));

                setRecipes(fetchedRecipes);
                // console.log("fetched")

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

    const getCaloriesBurned = async (tasks) => {

        const accessToken = localStorage.getItem('access_token');
        const tokenExpiration = localStorage.getItem('token_expiration');

        if (accessToken === null || !tokenExpiration || Date.now() > Number(tokenExpiration)) {
            setStravaResync("Go to Activities sync page and try to connect to Strava again to get Access token")
            return 0;
        }

        const stravaTasks = tasks.filter(task => task.isStravaActivitySynced === true);

        let totalCaloriesBurned = 0;

        for (const stravaTask of stravaTasks) {
            try {
                // console.log("strava sync id - ", stravaTask.syncedStravaActivity);

                if (!stravaTask.isStravaActivitySynced || typeof stravaTask.syncedStravaActivity !== 'number') {
                    continue;
                }

                const response = await fetch(`https://www.strava.com/api/v3/activities/${stravaTask.syncedStravaActivity}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const activityData = await response.json();
                    // console.log("activityData - ", activityData.calories)
                    // Add calories burned from this activity to the total
                    totalCaloriesBurned += activityData.calories;
                } else {
                    console.error('Failed to fetch activity details:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching activity details:', error);
            }
        }

        // console.log(totalCaloriesBurned)
        return totalCaloriesBurned;
    }

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

    const getFoodCaloriesIntakeAmount = (recipes) => {
        let totalCalories = 0;

        recipes.forEach((recipe) => {
            if (recipe.calories && typeof recipe.calories.amount === 'number') {
                totalCalories += recipe.calories.amount;
                // console.log("calories - ", recipe.calories.amount) 400 calories
            }
        });

        return totalCalories;
    }

    const getFoodFatIntakeAmount = (recipes) => {
        let totalFat = 0;

        recipes.forEach((recipe) => {
            if (recipe.fat && typeof recipe.fat.amount === 'number') {
                totalFat += recipe.fat.amount
            }
        });

        return totalFat;
    }


    if (tasks.length === 0 || events.length === 0 || fridge.length === 0 || recipes.length === 0 || caloriesBurned === -1) {
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
                </div>
            </div>
            <div className="pie-chart" >
                <TasksPieChart completed={completedTaskAmount} incompleted={incompletedTaskAmount} label1="Completed" label2="Incomplete" title="Task completion chart" />
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
                {stravaResync !== "" ? (
                    <div>{stravaResync}</div>
                ) : (
                    <div className="tasks-amount-div">
                        <div className="tasks-amount">
                            <p>Total calories burned by activities: </p>
                            <p>{caloriesBurned} kcal</p>
                        </div>
                        <div className="tasks-amount">
                            <p>Total calories intake by food: </p>
                            <p>{foodCalories} kcal</p>
                        </div>
                        <div className="tasks-amount">
                            <p>Total fat intake by food: </p>
                            <p>{foodFat} g</p>
                        </div>
                        {/* <div className="tasks-amount">
                            <p>Total calories burned: </p>
                            <p>{fridgeAmount}</p>
                        </div> */}
                    </div>
                )}
            </div>
            <div className="pie-chart" >
                <TasksPieChart completed={caloriesBurned} incompleted={foodCalories} label1="Burned calories from activities" label2="Calories intake from food" title="Total calories burn vs intake (kcal)" />
            </div>
        </div>
    );
}

export default ProfileStats;