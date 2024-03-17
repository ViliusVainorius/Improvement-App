import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import "./todo.css"

export default function TodoTasks({ currentUserUid }) {
  // const [todos, setTodos] = useState(() => {
  //   const localValue = localStorage.getItem("ITEMS");
  //   if (localValue == null) return [];

  //   return JSON.parse(localValue);
  // });
  const [todos, setTodos] = useState([]);



  // useEffect(() => {
  //   localStorage.setItem("ITEMS", JSON.stringify(todos));
  // }, [todos]);
  useEffect(() => {
    if (!currentUserUid) {
      const fetchTodos = async () => {
        const querySnapshot = await getDocs(collection(db, `/users/${currentUserUid}/tasks`));
        const fetchedTodos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTodos(fetchedTodos);
      };

      fetchTodos();
    }
  }, [currentUserUid]);

  if (currentUserUid) {
    return <div>Please sign in to view tasks!</div>;
  }

  function addTodo({ title, description, dueDateTime }) {
    setTodos((currentTodos) => {
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
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <div className="component-wrapper">
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
