import { db } from "../firebase/firebase";

const FetchTasks = (userId, fetchDataTrigger) => {

    const [tasks, setTasks] = useState([]);

    const getDataFromDB = async () => {
        try {
            const dataArray = [];
            const querySnapshot = await getDocs(query(collection(db, `users/${userId}/tasks`), where("completed", "==", false)));
            querySnapshot.forEach((doc) => {
                const { title, description, dueDateTime, createdAt, activityType } = doc.data();
                const dataObject = {
                    id: doc.id,
                    title,
                    description,
                    createdAt,
                    dueDateTime,
                    activityType
                };
                dataArray.push(dataObject);
            });
            return dataArray;
        } catch (error) {
            throw new Error('Error fetching data from database: ' + error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getDataFromDB();
                setTasks(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId, fetchDataTrigger]);

    return tasks;
}

export default FetchTasks;