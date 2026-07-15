

//Run this function each time data needs to be fetched given an api endpoint
async function fetchData(url) {

    try{
        let response = await fetch(url);
        let data = await response.json();

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        let movesLength = data.moves.length;
        let attackList = Math.floor(Math.random() * movesLength);


        let pokemonSprite = data.sprites.front_default;
        let pokemonSpecies = data.species.name;
        let pokemonAttack = data.moves[attackList].move.name;
        let pokemonType = data.types[0].type.name; //types is an array and must be accessed by index
        
        let pokemonImg = document.querySelector("#pokemonSprite");
        let pokemonTypeContainer = document.querySelector("#type");
        let defaultImg = document.querySelector("#tempImg");
        
        let attack = document.querySelector("#attack");
        let displayInfo = document.querySelector("#info");
        let species = document.querySelector("#species");
        let card = document.querySelector("#card");


        card.style.borderColor = "gold";


        pokemonImg.src = pokemonSprite;
        pokemonImg.style.display = "block";
        defaultImg.style.display = "none";
        
        displayInfo.style.display = "block";
        displayInfo.style.backgroundColor = "silver";

        attack.textContent = "Ability: " + pokemonAttack;
        pokemonTypeContainer.textContent = "Type: " + pokemonType;
        species.textContent = "Species: " + pokemonSpecies
    
        if (pokemonType === "electric") {
            card.style.backgroundColor = "yellow";
        } else if (pokemonType === "fire") {
            card.style.backgroundColor = "red";
        } else if (pokemonType === "steel") {
            card.style.backgroundColor = "silver";
        } else if (pokemonType === "normal") {
            card.style.backgroundColor = "grey";
            card.style.borderColor = "gold";
        } else if (pokemonType === "water") {
            card.style.backgroundColor = "#0080B3";
        } else if (pokemonType === "rock") {
            card.style.backgroundColor = "grey";
        } else if (pokemonType === "psychic") {
            card.style.backgroundColor = "#7b3484";
        } else if (pokemonType === "grass") {
            card.style.backgroundColor = "green";
        } else if (pokemonType === "bug") {
            card.style.backgroundColor = "#703300";
        } else if (pokemonType === "poison") {
            card.style.backgroundColor = "#560076";
        } else if (pokemonType === "fighting") {
            card.style.backgroundColor = "#ff8402";
        } else if (pokemonType === "ghost") {
            card.style.backgroundColor = "#583d66";
        } else if (pokemonType === "ice") {
            card.style.backgroundColor = "#a6ecff";
        }
        

    } catch (error) {
        console.log(error);
    }
}

function getPokemon() {
    
    let pokemonName = document.querySelector("#pokemonName").value.toLowerCase();
    let pokemonNameError = document.querySelector("#inputError");

    if (pokemonName.length === 0) {
        pokemonNameError.textContent = "Sorry, I didn't catch that. Please, enter the name of a Pokemon."
        pokemonNameError.style.color = "red";
        pokemonNameError.style.fontSize = "25px"
        pokemonNameError.style.weight = "bold";
    }

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    fetchData(url);

    let pokemonInput = document.querySelector("#pokemonName");
    pokemonInput.value = "";
}


//Event Listeners
document.querySelector("#submit").addEventListener("click", getPokemon);

//Alternative to using await and async
// let url = "https://pokeapi.co/api/v2/pokemon/pikachu";
// fetch(url).then(response => {
    
//     if(!response.ok) {
//         throw new Error("Couldn't fetch resource");
//     }
//     return response.json();
// })

//     .then(data => console.log(data.weight))
//     .catch(error => console.error(error));