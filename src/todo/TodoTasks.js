import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, addDoc, getDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import "./todo.css"

export default function TodoTasks({ userId }) {
  // const [todos, setTodos] = useState(() => {
  //   const localValue = localStorage.getItem("ITEMS");
  //   if (localValue == null) return [];

  //   return JSON.parse(localValue);
  // });
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem("ITEMS", JSON.stringify(todos));
  // }, [todos]);

  async function getDataFromDB() {
    //Single doc by id fetch
    // const usersDocRef = doc(db, "users", userId);
    // const docSnap = await getDoc(usersDocRef);

    //Fetch all docs
    const dataArray = [];
    const querySnapshot = await getDocs(collection(db, `users/${userId}/tasks`));
    querySnapshot.forEach((doc) => {
      const { title, description, dueDate } = doc.data();
      const dataObject = {
        id: doc.id,
        title: title,
        description: description,
        dueDate: dueDate
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
    console.log(dataArray)
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
  }, []);

  function addTodo({ title, description, dueDateTime }) {
    setTasks((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title,
          description,
          dueDateTime,
          completed: false,
        },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTasks((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTasks((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <div className="component-wrapper">
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList
        todos={tasks}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
