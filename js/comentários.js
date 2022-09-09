// função com id como parâmetro q retorna a url p buscar as infos do pokemon 
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

    
// função responsável por gerar e retornar o array de promises de pokemons --> contudo, foi desconsiderada no momento por ser mais complexa
//const generatePokemonPromises = () => Array(151).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(response => response.json()))


const pokemonPromises = []; // array vazio que será alimentado a cada itereção do loop abaixo

// loop q a cada iteração obterá uma resposta e retornará uma promessa com o json dessa resposta 
for(let i = 1; i <= 151; i++) { // 1 = id do 1º pokemon ... 151 = id do último pokemon
    pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())); 
}

// esta função retorna implicitamente o resultado do reduce
const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name); 

/*
    o *reduce* é utilizado para reduzir um array em algum outro tipo de dado ... neste caso, como argumento do reduce é passado um reducer q é uma função com 
    os parâmetros *accumulator*(q é o parâmetro que gerará a string a cada iteração) e uma expressão que possibilitará atribuir p a variáveis cópias dos valores 
    do objeto pokemon(pokemon) que está sendo recebido, então, o valor das propriedades name, id e types será copiado para as suas variáveis    
    

    types - é um parâmetro 
    map - basicamente mapeia uma propriede de um objeto e devolve a propriedade buscada numa lista
    typeInfo = argumento q representa cada objeto do array
    type.name = nome do tipo do pokemon 

    a const elementTypes está armazenando o nome do tipo do pokemon
*/

    accumulator += `
        <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${configuraPokemonId(id.toString())}.png">
            <h2 class="card-title">${id}. ${name}</h2> 
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
    `
    return accumulator;
}, '')

/*
dentro da função é feito com que o accumulator receba todo o valor que ele já tem concatenado à uma template string com abertura e fechamento da tag li
no html há uma ul vazia, sem li, o plano é fazer com que cada pokemon seja uma li ... 

as imagens dos pokemons foram pegas de uma API diferente

<h2 class="card-title">${id}. ${name}</h2> --> duas interpolações que recebem a cópia do valor das propriedade id e name

<p class="card-subtitle">${elementTypes.join(' | ')}</p> --> interpolação que recebe o nome do tipo do pokemon concatenado com o método join

o método *join* retorna uma nova string com todos os itens do array concatenados e separados por vírgula ... contudo, o join pode receber um 
argumento opcional e esse argumento opcional é um separador, neste caso o separador escolhido foi '|'


depois do bloco da função é inserido o valor inicial do accumulator, q é uma string vazia --> }, '')
*/

const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]'); // puxa a ul
    ul.innerHTML = pokemons; // insere as li's com os pokemons na pág.
}

         
//const pokemonPromises = generatePokemonPromises();  


Promise.all(pokemonPromises)
    .then(generateHTML) // recebe a função generateHTML como parâmetro    
    .then(insertPokemonIntoPage) // recebe a função insertPokemonIntoPage como parâmetro 

/* 
    o Promise.all permite que todos estes requests assíncronos --> fetch(getPokemonUrl(i)).then(response => response.json()) sejam feitos em paralelo
    e quando todos tiverem sido feitos, nos dois then, será feita alguma ação com a Promise que o método all retornar ... por parâmetro é recebido um array
    com todos os requests resolvidos da pokemonPromises ... e este request resolvido é um objeto com infos do pokemon em questão ... e assim, se tem um array 
    com os 151 pokemons

    ao retornar uma promessa e para que algo seja feito com o resultado da promessa, o método then é chamado
*/

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


// exemplo de utilização do map
// const types = [
//     {
//         "name": "grass",
//         "url": ""
//     },
//     {
//         "name": "poison",
//         "idade": ""
//     }
// ];

// const pokeTypes = types.map(type => type.name);

// console.log(pokeTypes);