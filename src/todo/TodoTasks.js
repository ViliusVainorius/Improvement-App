import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import { db } from "../firebase/firebase";
import { collection, serverTimestamp, Timestamp, onSnapshot, addDoc, getDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import "./todo.css"

export default function TodoTasks({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  // console.log(userId)

  async function getDataFromDB() {
    //Single doc by id fetch
    // const usersDocRef = doc(db, "users", userId);
    // const docSnap = await getDoc(usersDocRef);

    //Fetch all docs
    const dataArray = [];
    const querySnapshot = await getDocs(query(collection(db, `users/${userId}/tasks`), where("completed", "==", false)));
    querySnapshot.forEach((doc) => {
      const { title, description, dueDateTime, createdAt, activityType } = doc.data();
      const dataObject = {
        id: doc.id,
        title: title,
        description: description,
        createdAt: createdAt,
        dueDateTime: dueDateTime,
        activityType: activityType
      }
      dataArray.push(dataObject);
      // console.log(doc.id, " => ", doc.data());
    });

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    // console.log(dataArray)
    return dataArray;
  }

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
  }, [fetchDataTrigger]);

  async function addTodo({ title, description, dueDateTimeString, activityType }) {
    try {
      const parsedDateTime = new Date(dueDateTimeString);
      const dueDateTime = Timestamp.fromDate(parsedDateTime);

      // console.log(userId)
      await addDoc(collection(db, `users/${userId}/tasks`), {
        title,
        description,
        dueDateTime,
        createdAt: serverTimestamp(),
        completed: false,
        activityType,
      });

      setFetchDataTrigger(prevTrigger => !prevTrigger);

    } catch (error) {
      console.error('Error adding todo:', error);
      // Handle error, if any
    }
  }

  async function completeTodo(id, dueDateTime) {

    const currentDateTime = new Date();
    const dueDate = dueDateTime.toDate();

    const isInTime = currentDateTime < dueDate;

    try {
      // Update the completed field in Firestore
      await updateDoc(doc(db, `users/${userId}/tasks`, id), {
        completed: true,
        isCompletedInTime: isInTime
      });

      setFetchDataTrigger(prevTrigger => !prevTrigger);

    } catch (error) {
      console.error('Error completing todo:', error);
      // Handle error, if any
    }
  }


  async function deleteTodo(id) {
    try {
      await deleteDoc(doc(db, `users/${userId}/tasks`, id));
      setFetchDataTrigger(prevTrigger => !prevTrigger);
      //console.log(id)
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Handle error, if any
    }
  }

  return (
    <div className="component-wrapper">
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList
        todos={tasks}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
