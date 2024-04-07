import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { FaRegCheckSquare } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";

const CompletedActivitiesListing = () => {
    const { userLoggedIn, currentUser } = useAuth()
    const [tasks, setTasks] = useState([]);

    const formatDateTime = (timestamp) => {
        const date = timestamp.toDate();
        const formattedDate = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return formattedDate;
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const userId = currentUser.uid;
                const querySnapshot = await getDocs(
                    query(collection(db, `users/${userId}/tasks`),
                        where("completed", "==", true)));
                const dataArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                //const selectedTaskObjects = dataArray.filter(task => task.isStravaActivitySynced === undefined || !task.isStravaActivitySynced);

                setTasks(dataArray);
                console.log(dataArray)
            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Handle error
            }
        };

        fetchTasks();
    }, []);

    return (
        <>
            <div>
                {tasks.map((task, index) => (
                    <div className="activity-items" key={index}>
                        <div className="activity-values">
                            {task.title}
                        </div>
                        <div className="activity-values">
                            {task.description}
                        </div>
                        <div className="activity-values">
                            {formatDateTime(task.createdAt)}
                        </div>
                        <div className="activity-values">
                            {task.isCompletedInTime ? (
                                <FaRegCheckSquare style={{ fontSize: '24px', color: 'green' }} />
                            ) : (
                                <CgCloseR style={{ fontSize: '24px', color: 'red' }} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CompletedActivitiesListing;