const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
    

//const generatePokemonPromises = () => Array(150).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const pokemonPromises = [];

for(let i = 1; i <= 151; i++) { 
    pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())); 
}

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name); 

    accumulator += `
        <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${configuraPokemonId(id.toString())}.png">
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
    `
    return accumulator;
}, '')    


const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]');

    ul.innerHTML = pokemons;
}

         
//const pokemonPromises = generatePokemonPromises();        

Promise.all(pokemonPromises)
    .then(generateHTML)    
    .then(insertPokemonIntoPage)

const types = [
    {
        "name": "grass",
        "url": ""
    },
    {
        "name": "poison",
        "idade": ""
    }
];

const pokeTypes = types.map(type => type.name);

console.log(pokeTypes);



// função para buscar a imagem dos pokemons
const configuraPokemonId = (id) => {
    if (id.length == 1) {
        return '00' + id
    } else if (id.length == 2){
        return '0' + id
    } else {
        return id
    }
}