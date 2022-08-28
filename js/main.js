const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');


// função p fazer a busca dos pokemons na API 

    // fetch = utiliza o método GET do protocolo CRUD - busca os dados do pokemon na API ... async = p função assíncrona
const fetchPokemon = async (pokemon) => {
            
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    /* APIResponse = resposta da API na var(const) 
        await = p aguardar o término da chamada (do fetch), que é assíncrono
          assíncrono = algo que ñ acontece de maneira imediata, ou seja, devemos esperar 
    */

    // pega a resposta da API e extrai em JSON q tbm é uma função assíncrona       
    const dadosPokemon = await APIResponse.json();

    return dadosPokemon;
}

// função p renderizar o pokemon no HTML
const renderPokemon = async (pokemon) => {

    const dados = await fetchPokemon(pokemon);

    pokemonName.innerHTML = dados['name'];
    pokemonNumber.innerHTML = dados['id'];
    pokemonImage.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

}

form.addEventListener('submit', function(event){
    
    // preventDefault() = previne as configurações padrões do evento(event) p q possamos manusear o evento da maneira desejada
    event.preventDefault();
    
    console.log(event);

});







