//1; configurer ma methode fetch
const fetch_config = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

// 2; créer une variable offset = variable globale à laquelle on va ajouter ou retirer 20, plus bas
let offset = 0;
let pokeIndex = 0;
let id = 0;
const screenShow = document.querySelector(".main-screen");
const colors = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
];

function getPokemons() {
  const url =
    "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=20";

  // 3; requête Ajax (data est un tableau qui s'appelle results dans lequel il y a des données)
  fetch(url, fetch_config).then((response) => {
    response.json().then((data) => {
      if (0 !== data.results.length) {
        // 4 ; nous allons vider la liste contenue dans right-container_screen
        const content = document.querySelector(".right-container__screen");
        console.log(content);
        content.innerHTML = "";
        pokeIndex = offset;

        // 5; puis parcourir tous les éléments du tableau results et les placer dans une variable poke dans laquelle on va ajouter chaque pokemon au fur et à mesure
        data.results.forEach((poke) => {
          content.innerHTML +=
            '<div class="list-item">' + ++pokeIndex +" " +poke.name +
            "</div>";
        });
        getPokemonsName();
      } else {
        alert("plus de pokemons!!!!");
      }
    });
  });
}

// 2a; fonction qui ajoute 20 pokemons à la liste
function nextPage() {
  offset += 20;
  getPokemons();
}

// 2b; fonction qui retire 20 pokemons à la liste mais empêche de chercher dans les négatifs
function prevPage() {
  if (offset >= 20) {
    offset -= 20;
    getPokemons();
  }
}
function removeColors() {
  for (const color of colors) {
    screenShow.classList.remove(color);
  }
}

// 3b
function getPokemonsName() {
  let listItem = document.querySelectorAll(".list-item");
  listItem.forEach((item) => {
    item.addEventListener("click", function () {
      let pokeName = item.textContent.split(" ")[1];
      fetch("https://pokeapi.co/api/v2/pokemon/" + pokeName).then((res) =>
        res.json().then((data3) => {
          //  console.log(data3);
          removeColors();
          screenShow.classList.remove("hide");
          document.querySelector(".poke-name").textContent = data3.name;
          document.querySelector(".poke-id").textContent = data3.id;
          document.querySelector(".poke-weight").textContent = data3.weight;
          document.querySelector(".poke-height").textContent = data3.height;
          console.log(data3);
          const pokesTypes = data3.types;
          const pokesTypes1 = data3.types[0];
          const pokesTypes2 = data3.types[1];
          let pokeTypeTwo = document.querySelector(".poke-type-two");
          document.querySelector(".poke-type-one").textContent =
          pokesTypes1["type"]["name"];
          if (pokesTypes2) {
            pokeTypeTwo.textContent = pokesTypes2["type"]["name"];
            pokeTypeTwo.classList.remove("hide");
          } else {
            pokeTypeTwo.classList.add("hide");
            pokeTypeTwo.textContent = "";
          }
          let imgScreen = document.querySelector(".screen__image");
          imgScreen.innerHTML = `<img src="${data3.sprites.front_default}" class="poke-front-image" alt="front">
          <img src="${data3.sprites.back_default}" class="poke-back-image" alt="back">`;
          screenShow.classList.add(pokesTypes[0]["type"]["name"]);
        })
      );
    });
  });
}

// 5; DOMContentLoaded - le code ne sera exécuter que lorsque le document HTML initial aura été complètement chargé et analysé, sans attendre que les feuilles de style, images et sous-documents aient terminé de charger.
document.addEventListener(
  "DOMContentLoaded",
  function () {
    getPokemons();

    document
      .querySelector(".right-button")
      .addEventListener("click", function () {
        nextPage();
      });

    document
      .querySelector(".left-button")
      .addEventListener("click", function () {
        prevPage();
      });
  },
  false
);
