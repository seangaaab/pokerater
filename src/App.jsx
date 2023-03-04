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

	const name = fetch("https://pokeapi.co/api/v2/pokemon/1/sprites/front_default")
	console.log(name)

	return (
	<section className="container">
		<h1>Pokerater</h1>
		<div>
			<form onSubmit={addTodo}>
				<img src="https://pokeapi.co/api/v2/pokemon/1/sprites/front_default" />
				<h3>Name: </h3>
				<h3>Rank: </h3>
				<p>Score: </p>
				<span>
					<button>Up Vote</button>
					<button>Down Vote</button>
				</span>
			</form>
		</div>
	</section>
	);
}

export default App;
