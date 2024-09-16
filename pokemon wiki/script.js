document.addEventListener('DOMContentLoaded',fetchKantoPokemon())
const individual_pokes = document.getElementsByClassName('pokemonlist')

function fetchKantoPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){

            fetchPokemonData(pokemon); 
        })
    })
}
function fetchPokemonData(pokemon){
    let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        console.log(pokeData)
        renderPokemon(pokeData)
    })
}
function renderPokemon(pokeData){
    let bigcont = document.getElementById("supermegacont");
    let cont = document.createElement("div")
    bigcont.classList.add('pokemonlist')

    let spr = document.createElement('img')
    spr.src = pokeData.sprites.front_default
    let num = document.createElement('h2')
    num.innerText = pokeData.id
    let name = document.createElement('h4')
    name.innerText = pokeData.name
    let type = document.createElement('h6')
    pokemonTypes(pokeData, type)
    cont.append(spr, num, name, type)
    bigcont.appendChild(cont)
}


function pokemonTypes(pokeData, type){
    if (pokeData.types.length > 1) {
        type.innerText = pokeData.types[0].type.name + " / " + pokeData.types[1].type.name
    } else {
        type.innerText = pokeData.types[0].type.name
    }
}