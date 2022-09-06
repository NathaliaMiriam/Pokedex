const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


// função p fazer a busca dos pokemons na API 
    // fetch = utiliza o método GET do protocolo CRUD - busca os dados do pokemon na API ... async = p função assíncrona
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`); // toLowerCase() = passa todos os caracteres do input p minusculo
    /* APIResponse = resposta da API na var(const) 
        await = p aguardar o término da chamada (do fetch), que é assíncrono
          assíncrono = algo que ñ acontece de maneira imediata, ou seja, devemos esperar 
    */

    if (APIResponse.status == 200) {
        // pega a resposta da API e extrai em JSON q tbm é uma função assíncrona       
        const dadosPokemon = await APIResponse.json();

        return dadosPokemon;
    }
}

// função p renderizar o pokemon no HTML
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading..."; // p quando estiver buscando o pokemon
    pokemonNumber.innerHTML = ""; // p ñ mostrar o nº do pokemon anterior quando estiver buscando o próximo

    const dados = await fetchPokemon(pokemon); // recebe os dados do pokemon a ser renderizado na tela

    // checa se voltou algum dado de pokemon ou ñ (caso o pokemon ñ seja encontrado)
   if(dados) {
        pokemonName.innerHTML = dados['name'];
        pokemonNumber.innerHTML = dados['id'];
        pokemonImage.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = ''; // limpa o input após o clique do Enter
    } else {
        pokemonName.innerHTML = "Not Found :c"; // mensagem p quando ñ for encontrado um pokemon
        pokemonNumber.innerHTML = ""; // limpa o nº quando o pokemon ñ for encontrado
        pokemonImage.src = "";
    }
}

// adiciona ao form o evento de submit, ou seja, ao enviar o form uma função será executada
form.addEventListener('submit', async function(event){
    
    // por ser um form possui um comportamento padrão que precisará ser bloqueado ...
    event.preventDefault();
    // o preventDefault previne as configurações padrões do evento(event) p q possamos manusear o evento da maneira desejada
    // com isso já é possível resgatar o que for digitado no input
    
    
    await renderPokemon(input.value); // p renderizar o que for digitado no input 

    contador = parseInt(pokemonNumber.innerHTML);
});

buttonPrev.addEventListener("click", () => {
    if(contador == 1) {
        contador = 649;
    } else {
        contador -= 1;
    }    
    
    renderPokemon(contador.toString());
});

buttonNext.addEventListener("click", () => {
    if(contador == 649) {
        contador = 1;
    } else {
        contador += 1;
    }    
    
    renderPokemon(contador.toString())
});

let contador = 1;

renderPokemon(contador.toString()); // aparecerá sempre o pokemon de nº 1 quando a pag. for renderizada/atualizada







