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
	const [pokemons, setPokemons] = useState([]);
	const [input, setInput] = useState("");

	async function addPokemon(event) {
		event.preventDefault();

		// ... code goes here

		setInput("");
	}

	async function toggleComplete(id, completed) {
		// ... code goes here
	}

	async function deletePokemon(id) {
		// ... code goes here
	}

	useEffect(() => {
		const sortedPokemons = query(
			collection(db, "pokemons"),
			orderBy("timestamp", "desc")
		);

		const unsubscribe = onSnapshot(sortedPokemons, (snapshot) => {
			setPokemons(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
					votes: doc.data().votes,
					voted_againsts: doc.data().voted_againsts,
					score: doc.data() - doc.data().voted_againsts
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
			<form onSubmit={addPokemon}>
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
		<div>
			{
				pokemons.map((pokemon) => (
					<div key={pokemon.id}>
						<h3>{pokemon.name}</h3>
						<p>{pokemon.votes}</p>
						<p>{pokemon.voted_againsts}</p>
						<p>{pokemon.votes} </p>
						<p>{pokemon.score}</p>
					</div>
				))
			}
		</div>
	</section>
	);
}

export default App;
