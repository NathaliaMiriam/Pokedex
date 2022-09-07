// função que irá buscar os pokemons na API
const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`; // função com id como parâmetro q retorna a url p buscar as infos do pokemon 

    const pokemonPromises = []; // array vazio que será alimentado a cada intereção do loop abaixo

    // loop q a cada interação executará o fetch, obterá uma resposta e retornará uma promessa com o json dessa resposta
    for(let i = 1; i <= 150; i++) { // 1 = id do 1º pokemon ... 150 = id do último pokemon
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())); 
    }


    // fetch(url) // o método fetch trará os dados da url acima ... retornará uma promessa e para que algo seja feito com o resultado da promessa, o método then é chamado
    //     .then(response => response.json())  // a função está retornando a resposta da promessa convertida em json p obtermos o body(corpo desta resposta)
    //     .then(pokemon => {     // o retorno do then tbm resulta numa promessa, por isso chamamos outro then q recebe uma função com um parâmetro
    //         console.log(pokemon); // no console visualizamos a info do que foi passado e recebido pelo parâmetro
    //     })    
    
    
    // método estático que recebe um array de promessas como argumento e quando todas as promessas deste array estiverem resolvidas, a expressão retornará uma promessa 
    Promise.all(pokemonPromises)
    .then(pokemons => { // por retornar uma promessa, o then é chamado e recebe uma função com parâmetro q retornará infos do pokemon em questão
        console.log(pokemons); // e aqui conseguimos ver no console o array com os 150 pokemons
    })  


    /* o Promise.all permite que todos estes requests assíncronos --> fetch(getPokemonUrl(i)).then(response => response.json()) sejam feitos em paralelo
     e quando todos tiverem sido feitos, no then, será feita alguma ação com a Promise que o método all retornar ... por parâmetro é recebido um array
     com todos os requests resolvidos da pokemonPromises ... e este request resolvido é um objeto com infos do pokemon em questão ... e assim, 
     se tem um array com os 150 pokemons
*/
}

fetchPokemon();