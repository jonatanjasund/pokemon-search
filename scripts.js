const endpoint = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const speed = document.getElementById("speed");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const imageContainer = document.getElementById("image-container");
const statsContainer = document.getElementById("stats-container");
const pokemonTypes = document.getElementById("types");
const previousButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const output = document.querySelector(".output");

const typeColors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};



const fetchData = async (query) => {
  try {
    const res = await fetch(`${endpoint}/${query}`);
    const data = await res.json();
    showData(data)
  } catch (err) {
    alert("Pokémon not found");
    reset();
  }
}

const updateStats = (stats) => {
  output.style.color = "#222224";

  stats.forEach((item) => {
    const { base_stat, stat } = item;
    const { name } = stat;

    const cell = document.getElementById(`${name}`)
    cell.style.color = "black";
    cell.innerText = base_stat;
  })
}

const showData = (data) => {
  const {name, id, height, weight, stats, types} = data;

  if (id > 1) {
    previousButton.disabled = false;
  } else {
    previousButton.disabled = true;
  }
  
  nextButton.disabled = false;

  updateStats(stats)

  pokemonTypes.innerHTML = types.map((item) => {
    const {name} = item.type

    
    return `<span class="type ${name}" style="background-color: ${typeColors[name]}">${name.toUpperCase()}</span>`;
  }).join(" ")

  pokemonName.innerText = name.toUpperCase();
  pokemonID.innerText = `${id}`;
  pokemonHeight.innerText = height;
  pokemonWeight.innerText = weight;

  imageContainer.innerHTML = `
    <img id="sprite" src="${data.sprites.front_default}"/>
  `
};

const cleanInput = (str) => {
  return str.toLowerCase().split(" ").join("-");
}

const reset = () => {
  searchInput.value = "";
  pokemonID.innerText = "0";
  output.style.color = "gray";
  pokemonName.innerText = "";
  pokemonWeight.innerText = "--";
  pokemonHeight.innerText = "--";
  pokemonTypes.innerHTML = "";
  imageContainer.innerHTML = "";
  previousButton.disabled = true;
  nextButton.disabled = true;
};

searchButton.addEventListener("click", () => {
  const query = cleanInput(searchInput.value);
  fetchData(query);
})

previousButton.addEventListener("click", () => {
  const query = Number(pokemonID.innerText) - 1;
  fetchData(query);
})

nextButton.addEventListener("click", () => {
  const query = Number(pokemonID.innerText) + 1;
  fetchData(query);
})
