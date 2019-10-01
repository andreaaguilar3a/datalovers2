const data = POKEMON.pokemon;
document.getElementById("btnPokemon").addEventListener("click", changeTitleToPokemon);
document.getElementById("eggsBtn").addEventListener("click", changeTitleToEggs);

// función que cambia los elementos HTML después de hacer clic en el botón "Pokemon"
function changeTitleToPokemon() {
    document.getElementById("ShowBox").innerHTML = "<select id=\"order\"><option value=\"num\">Pokedéx 1 a 151</option><option value=\"num2\">Pokedéx 151 a 1</option><option value=\"AZ\">A-Z</option><option value=\"ZA\">Z-A</option></select>";
    document.getElementById("back").innerHTML = "<input type=\"button\" class=\"btn back\" value=\"Volver\" onClick=\"window.location.reload()\">";
    document.getElementById("order").addEventListener("click", () => {
        const order = document.getElementById("order").value;
        const pokeData = app.changeOrder(data, order);
        printPokemons(pokeData);
    });
    document.getElementById("pageTitle").innerHTML = "Pokemon";
    document.getElementById("buttons").innerHTML = "";
    printPokemons(data);
};


// función que imprime la pantalla de Pokemon en tarjetas
function printPokemons(arr) {
    document.getElementById("listById").innerHTML = "";
    data.forEach((element) => {
        createDivs(element, "");
    });
};


// función que cambia los elementos HTML después de hacer clic en el botón "Huevos" y llama a la función de filtro de huevo
function changeTitleToEggs() {
    document.getElementById("ShowBox").innerHTML = "<input id=\"eggFilter2km\" class=\"eggImg\" type=\"image\" src=\"huevo2km.png\" value=\"2 km\"> <input id=\"eggFilter5km\" class=\"eggImg\" type=\"image\" src=\"huevo5km.png\" value=\"5 km\"> <input id=\"eggFilter10km\" class=\"eggImg\" type=\"image\" src=\"huevo10km.png\" value=\"10 km\">";
    document.getElementById("back").innerHTML = "<input type=\"button\" class=\"btn back\" value=\"Volver\" onClick=\"window.location.reload()\">";
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("pageTitle").innerHTML = "Huevos";
    data.forEach((element) => {
        createDivs(element, "withEgg");

    });
    const percentNotInEggs = app.notInEggs(data, "Not in Eggs");
    const resultNotInEggs = Math.round(percentNotInEggs / 151 * 100);
    document.getElementById("result").innerHTML = resultNotInEggs + "% de Pokémon no aparece en los huevos. Haga clic en los huevos de arriba para averiguar qué huevos nacen.";

    eggFilter2km.addEventListener("click", (e) => {
        const kmValue = e.target.value;
        const egg = app.filterEggsByKm(data, kmValue);
        newCards(egg);

        const percent2km = Math.round(parseFloat((egg.length) / 151 * 100));
        document.getElementById("result").innerHTML = percent2km + "% de 151 Pokémon aparecen en huevos de 2 km";

    });
    eggFilter5km.addEventListener("click", (e) => {
        const kmValue = e.target.value;
        const egg = app.filterEggsByKm(data, kmValue);
        newCards(egg);

        const percent5km = Math.round(parseFloat((egg.length) / 151 * 100));
        document.getElementById("result").innerHTML = percent5km + "% de 151 Pokémon aparecen en huevos de 5 km";

    });
    eggFilter10km.addEventListener("click", (e) => {
        const kmValue = e.target.value;
        const egg = app.filterEggsByKm(data, kmValue);
        newCards(egg);

        const percent10km = Math.round(parseFloat((egg.length) / 151 * 100));
        document.getElementById("result").innerHTML = percent10km + "% de 151 Pokémon aparecen en huevos de 10 km";

    });

    // función que crea cartas de pokemon después de seleccionar el kilometraje del huevo en el botón
    function newCards(filteredEggs) {
        document.getElementById("listById").innerHTML = "";
        filteredEggs.forEach((item) => {
            createDivs(item, "withEgg");
        });
    }
}


// crea la función de tarjetas (nuevo <div>)
function createDivs(element, divType) {
    const name = document.createElement("div");
    name.innerHTML = element.name;
    const img = document.createElement("img");
    img.src = element.img;
    const num = document.createElement("div");
    num.innerHTML = "Pokedéx: #" + element.num;
    const card = document.createElement("div");
    if (divType == "withEgg") {
        const egg = document.createElement("div");
        egg.innerHTML = element.egg;
        card.appendChild(egg);
        card.className = "pokemonCard";
    } else {
        card.className = "pokemonCard withoutEgg";
    }
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(num);

    // agregue el evento de clic de la tarjeta, llamando a la función que conduce a la interfaz de información de cada pokemon
    document.getElementById("listById").appendChild(card).innerHTML;
    if (divType != "withEgg") {
        card.addEventListener("click", () => {
            eachPokemon(element);
        });
    };
};

// función que trae la interfaz con información de cada pokemon en el que se hace click
function eachPokemon(pokemonData) {
    document.getElementById("pageTitle").innerHTML = pokemonData.name;
    document.getElementById("introText").innerHTML = "";
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("ShowBox").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("back").innerHTML = "<input type=\"button\" class=\"btn back\" value=\"Volver\" onClick=\"changeTitleToPokemon()\">";
    document.getElementById("listById").innerHTML = "";
    const img = document.createElement("img");
    img.src = pokemonData.img;
    img.className = "pokeImg";
    const num = document.createElement("div");
    num.innerHTML = "Pokedéx: #" + pokemonData.num;
    num.className = "pokeNum";
    const weaknesses = document.createElement("div");
    weaknesses.innerHTML = "Debilidades: " + pokemonData.weaknesses;
    weaknesses.className = "pokeWeaknesses";
    const type = document.createElement("div");
    type.innerHTML = "Tipo: " + pokemonData.type;
    type.className = "pokeType";
    const avg_spawns = document.createElement("div");
    avg_spawns.innerHTML = "oportunidades de aparición: " + pokemonData.avg_spawns + "%";
    avg_spawns.className = "poke.avg_spawns"
    const card = document.createElement("div");
    card.className = "pokeCard";
    card.appendChild(img);
    card.appendChild(num);
    card.appendChild(weaknesses);
    card.appendChild(type);
    card.appendChild(avg_spawns);
    document.getElementById("listById").appendChild(card).innerHTML;
};