/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function fetchAndPopulatePokemons(selectElement, nameElement) {
  try {
    const data = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=151');
    const pokemonsData = data.results;

    selectElement.innerHTML = '';

    pokemonsData.forEach((pokemon) => {
      const option = document.createElement('option');
      option.value = pokemon.url;
      option.textContent =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      selectElement.appendChild(option);
    });

    selectElement.style.display = 'block';
    selectElement.style.width = '250px';

    selectElement.addEventListener('change', (event) => {
      const selectedPokemonUrl = event.target.value;

      nameElement.textContent =
        event.target.options[event.target.selectedIndex].text;
      nameElement.style.display = 'inline';
      fetchImage(selectedPokemonUrl);
    });
  } catch (error) {
    console.error('Error populating Pokemon list:', error);
  }
}

async function fetchImage(pokemonUrl) {
  const imageElement = document.querySelector('#pokemon-image');
  try {
    const pokemonData = await fetchData(pokemonUrl);
    const frontSprite = pokemonData.sprites.front_default;

    if (frontSprite) {
      imageElement.src = frontSprite;
      imageElement.alt = pokemonData.name;
      imageElement.style.display = 'block';
    } else {
      imageElement.style.display = 'none';
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

async function main() {
  const body = document.querySelector('body');
  body.innerHTML = String.raw`
    <div id="container">
      <button id="get-pokemon">Get Pokémon</button>
      <select id="pokemons-list" style="width: 50px;"></select>
      <span id="pokemon-name" style="display: none;"></span> 
      <img id="pokemon-image" style="display: none;" />
    </div>`;

  const selectElement = document.querySelector('#pokemons-list');
  const nameElement = document.querySelector('#pokemon-name');
  const getPokemonBtn = document.querySelector('#get-pokemon');
  getPokemonBtn.addEventListener('click', () => {
    fetchAndPopulatePokemons(selectElement, nameElement);
  });

  selectElement.style.display = 'block';
}

window.addEventListener('load', main);
