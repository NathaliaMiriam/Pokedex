// função que irá buscar os pokemons na API
const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`; // função com id como parâmetro q retorna a url p buscar as infos do pokemon 

    const pokemonPromises = []; // array vazio que será alimentado a cada intereção do loop abaixo

    // loop q a cada interação executará o fetch, obterá uma resposta e retornará uma promessa com o json dessa resposta
    for(let i = 1; i <= 151; i++) { // 1 = id do 1º pokemon ... 151 = id do último pokemon
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())); 
    }

    // método estático que recebe um array de promessas como argumento e quando todas as promessas deste array estiverem resolvidas, a expressão retornará uma promessa 
    Promise.all(pokemonPromises)
    .then(pokemons => { 
        console.log(pokemons);
    })                            
}

fetchPokemon();