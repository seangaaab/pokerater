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
	setDoc,
	increment,
} from "firebase/firestore";
import "./App.css";

// Your task is to add the functionality to add, toggle, and delete todos. Goodluck!
// The name of the collection is "todos". You can rename it if you want. 
// Just make sure to change it in the App.jsx file as well.

function App() {
	const [pokemons, setPokemons] = useState([]);

	const [first_pokemon, setFirstPokemon] = useState({});
	const [second_pokemon, setSecondPokemon] = useState({});

	async function votePokemon(id) {
		const pokemonRef = doc(db, "pokemon", id)
		await updateDoc(
			pokemonRef,
			{
				votes: increment(1),
				score: increment(1)
			}
		)
	}

	async function voteAgainstPokemon(id) {
		const pokemonRef = doc(db, "pokemon", id)
		await updateDoc(
			pokemonRef,
			{
				votes_against: increment(1),
				score: increment(-1)
			}
		)
	}

	useEffect(() => {
		const sortedPokemons = query(
			collection(db, "pokemon"),
			orderBy("score", "desc")
		);

		const unsubscribe = onSnapshot(sortedPokemons, (snapshot) => {
			setPokemons(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
					votes: doc.data().votes,
					voted_againsts: doc.data().voted_againsts,
					score: doc.data().score
				}))
			);
		});

		const [first, second] = randomizer();
		const call_pokemon = async (first, second) => {
			const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${first}/`);
			const data1 = await response1.json();
			console.log(data1);
			setFirstPokemon(data1);

			const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${second}/`);
			const data2 = await response2.json();
			console.log(data2);
			setSecondPokemon(data2);
		}
		call_pokemon(first, second).catch((error) => {
			console.log(error);
		});
		return unsubscribe;
	}, []);


	function randomizer() {
		let rand1 = Math.floor(Math.random() * 151);
		let rand2 = Math.floor(Math.random() * 151);

		if (rand2 == rand1) {
			randomizer();
		}

		return [rand1, rand2];
	}

	// const name = fetch("")
	// console.log(first_pokemon.sprites["front_default"]);

	return (
		<>
			<section className="container">
				<h1>Pokerater</h1>
				<div>
					<form >
						<div className="container">
							<div className="card">
								<img src={first_pokemon.sprites?.front_default} />
								<h3>Name: {first_pokemon.name}</h3>
								<button className="btn">Vote</button>
							</div>
							<div className="card">
								<img src={second_pokemon.sprites?.front_default} />
								<h3>Name: {second_pokemon.name}</h3>
								<button className="btn">Vote</button>
							</div>
						</div>
					</form>
				</div>
				<div className="result">
					<div className="row">
						<p>Name</p>
						<p>Rank</p>
						<p>Score</p>
					</div>
					{
						pokemons.map((pokemon) => (
							<div className="row" key={pokemon.id}>
									<p>{pokemon.name}</p>
									<p>{pokemon.votes}</p>
									<p>{pokemon.score}</p>
							</div>
						))
					}
				</div>
			</section>
		</>
	);
}

export default App;
