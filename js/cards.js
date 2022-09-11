const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generationTitle = document.getElementById("generation-title"); // captura o h1

// função p capturar o parâmetro generation q recebemos pela URL(link)
const getParameterGeneration = () => {
    let interrogationPosition = document.URL.indexOf('?'); // captura a posição do ponto de interrogação na URL. O que existe depois do '?' são as var's que podem ser de 1 a 4
    let generation;

    if (interrogationPosition != -1) {
        let pair = document.URL.substring(interrogationPosition+1, document.URL.length); // .substring(ini, fin) --> corta um pedaço da sua string maior. Passar a posição inicial e final
        generation = pair.split("=")[1]; // parâmetro que vem é generation=1 -> com o .split("=") dividimos numa array assim: ["generation", "1"] e capturamos o elemento na posição [1];
    }                                         // split --> divide uma string em uma lista separada pelo caractere q é passado p ele(split) 
    return generation;
}

const generationToRender = getParameterGeneration(); // guardado o nº retornado pela função getParameterGeneration em uma variável 

const pokemonPromises = []; // array q será alimentada pelas condicionais da função loadGenerationTitleAndCards

// função para renderizar no h1 o título de acordo com a generation passada na variável 'generationToRender'
const loadGenerationTitleAndCards = (generationNumber) => {

    let gen1 = generationNumber == "1";
    let gen2 = generationNumber == "2";
    let gen3 = generationNumber == "3";
    let gen4 = generationNumber == "4";


    if(gen1) {
        generationTitle.innerHTML = "Pokemon Generation I";
        for(let i = 1; i <= 151; i++) { 
            pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())); 
        }
    } else if(gen2) {
        generationTitle.innerHTML = "Pokemon Generation II";
        for(let i = 152; i <= 251; i++) { 
            pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())); 
        }
    } else if(gen3) {
        generationTitle.innerHTML = "Pokemon Generation III";
        for(let i = 252; i <= 386; i++) { 
            pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())); 
        }
    } else if(gen4) {
        generationTitle.innerHTML = "Pokemon Generation IV";
        for(let i = 387; i <= 493; i++) { 
            pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())); 
        }
    } else {
        generationTitle.innerHTML = "Generation not found :c";
    }
}

loadGenerationTitleAndCards(generationToRender);


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
       

Promise.all(pokemonPromises)
    .then(generateHTML)    
    .then(insertPokemonIntoPage)


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