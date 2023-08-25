const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail, index) {
    const pokemon = new Pokemon();
    pokemon.number = index + 1; 
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.number}.gif`;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon, index) => {
    const requestOptions = {
        method: 'GET',
        headers: {    
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' },
        };

    
    return fetch(pokemon.url, requestOptions)
        .then((response) => response.json())
        .then((pokeDetail) => convertPokeApiDetailToPokemon(pokeDetail, index));
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => {
            return Promise.all(pokemons.map((pokemon, index) => pokeApi.getPokemonDetail(pokemon, index)));
        });
};
