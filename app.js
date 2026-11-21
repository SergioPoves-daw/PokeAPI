
/**
 * Ejercicio 1: Buscar y mostrar información del Pokemon con FETCH
 */
/**
 * Función para buscar pokemon ejercicio 1 y 2.
 * 
*/

/* // Ejercicio 1: BUSCAR POKEMON ASYNC AWAIT
async function buscarPokemon(nombrePokemon){
    try {
        let datos = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);

        if (!datos.ok) {
            throw new Error("La API no contesta");
        }
        let pokemon = await datos.json();


        let id = pokemon.id;
        let nombre = pokemon.name;
        let sprite = pokemon.sprites.front_default;

        console.log(pokemon.id) // Id
        console.log(pokemon.name); // Nombre
        console.log(pokemon.sprites.front_default); // Sprite

        let tarjeta = document.getElementById("pokemon-data");

        // Mostrar una sola tarjeta del pokemon
        tarjeta.innerHTML = `
            <div>
                <p>${id}: ${nombre}</p>
                <img src=${sprite}>
            </div>
        `;
    }

    catch (error) {
        alert(error);
    }
}*/

/* // Ejercicio 2: BUSCAR POKEMON THEN CATCH
function buscarPokemon(nombrePokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
    .then(datos => { // Si consigue datos, lo guarda en la variable datos
        if (!datos.ok) throw new Error("La API no encuentra nada");
        return datos.json();
    })
    .then(pokemon => { // Si no da ningún error, devuelve el json a la variable pokemon
        let tarjeta = document.getElementById("pokemon-data");
        tarjeta.innerHTML = `
            <div>
                <p>${pokemon.id}: ${pokemon.name}</p>
                <img src=${pokemon.sprites.front_default}>
            </div>
        `;
    })
    .catch(error => alert(`${error}`));
}*/

/**
 *  Descomentar para hacer uso de la función.
 */
/*
document.getElementById('search-btn').addEventListener('click', () => {
    // Para que cambie de pokemon cuando se busque otro valor
    let pokemon = document.getElementById("pokemon-input").value;
    buscarPokemon(pokemon);
});*/


/**
 * Ejercicio 3: buscar pokemon con JQuery AJAX.
 */
let pokemonAtrapados = [];

function buscarPokemonJQueryAJAX(nombrePokemon){
    $.ajax ({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`,
        success: function (pokemon) { // Si consigue datos, ejecuta la función
            // console.log(pokemon.name);
            let tarjeta = document.getElementById("pokemon-data");
            tarjeta.innerHTML = `
                <div>
                    <p>${pokemon.id}: ${pokemon.name}</p>
                    <img src=${pokemon.sprites.front_default}>
                    <button id="agregar">Agregar a la colección</button>
                </div>
            `;

            // Aquí ya existe el botón para agregar el pokemon
            document.getElementById("agregar").addEventListener("click", () => {
                if (!pokemonAtrapados.some(p => p.nombre == pokemon.name)) { // Si el array no tiene el pokemon, lo mete
                    pokemonAtrapados.push({
                        "nombre": pokemon.name, 
                        "sprite": pokemon.sprites.front_default
                    });
                }
            });
        },
        
        error: function() { // Si hay algún error, lo muestra (como el catch)
            alert("La API no encuentra nada");
        }
    });
}

/**
 * Haciendo uso de JQuery, descomentar para usar la función buscarPokemonJQueryAJAX
*/
$(document).ready(function(){
    $('#search-btn').on('click', () => {
        // Para que cambie de pokemon cuando se busque otro valor
        let pokemon = document.getElementById("pokemon-input").value;
        buscarPokemonJQueryAJAX(pokemon);
        console.log(pokemonAtrapados);
    });
});

function mostrarColeccion() {
    let contenedor = document.getElementById("collection-list");
    contenedor.replaceChildren(); // Para no duplicar los pokemon al mostrar

    pokemonAtrapados.forEach(p => {
        let tarjeta = document.createElement("div");

        let nombrePokemon = document.createElement("p");
        nombrePokemon.textContent = p.nombre;

        let spritePokemon = document.createElement("img");
        spritePokemon.src = p.sprite;

        tarjeta.append(nombrePokemon, spritePokemon);
        contenedor.appendChild(tarjeta);
    });
}

document.getElementById("view-collection-btn").addEventListener("click", mostrarColeccion);