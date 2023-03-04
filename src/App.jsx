import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
	collection,
	addDoc,
	onSnapshot,
	serverTimestamp,
	orderBy,
	query,
	doc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import "./App.css";

// Your task is to add the functionality to add, toggle, and delete todos. Goodluck!
// The name of the collection is "todos". You can rename it if you want. 
// Just make sure to change it in the App.jsx file as well.

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");

	async function addTodo(event) {
		event.preventDefault();

		// ... code goes here

		setInput("");
	}

	async function toggleComplete(id, completed) {
		// ... code goes here
	}

	async function deleteTodo(id) {
		// ... code goes here
	}

	useEffect(() => {
		const sortedTodos = query(
			collection(db, "todos"),
			orderBy("timestamp", "desc")
		);

		const unsubscribe = onSnapshot(sortedTodos, (snapshot) => {
			setTodos(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					todo: doc.data().todo,
					completed: doc.data().completed,
				}))
			);
		});

		return unsubscribe;
	}, []);

	return (
	<section>
		<h1>Todo App</h1>
	</section>
	);
}

export default App;
