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
function createAppStructure() {
  const app = document.createElement('div');
  app.className = 'container';

  const title = document.createElement('h1');
  title.textContent = 'Pokémon App';

  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';

  const input = document.createElement('input');
  input.id = 'search-input';
  input.type = 'text';
  input.placeholder = 'Enter Pokémon name or ID';

  const button = document.createElement('button');
  button.id = 'search-button';
  button.textContent = 'Search';

  inputContainer.append(input, button);

  const pokemonBox = document.createElement('div');
  pokemonBox.id = 'pokemon-box';

  const pokemonName = document.createElement('h2');
  pokemonName.id = 'pokemon-name';

  const imgDiv = document.createElement('div');
  imgDiv.id = 'img-div';

  const sprite = document.createElement('img');
  sprite.id = 'sprite';
  sprite.src = '';
  sprite.alt = 'Front sprite';

  const sprite2 = document.createElement('img');
  sprite2.id = 'sprite2';
  sprite2.src = '';
  sprite2.alt = 'Back sprite';

  imgDiv.append(sprite, sprite2);
  pokemonBox.append(pokemonName, imgDiv);

  app.append(title, inputContainer, pokemonBox);
  document.body.appendChild(app);
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error: Pokémon not found');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    alert(error.message);
    clearResults();
  }
}

async function fetchAndPopulatePokemons(query) {
  if (!query) {
    alert('Please enter a Pokémon name or ID');
    return;
  }
  try {
    const data = await fetchData(`https://pokeapi.co/api/v2/pokemon/${query}`);
    document.getElementById('pokemon-name').textContent =
      data.name.toUpperCase();
    fetchImage(data.sprites);
  } catch (error) {
    clearResults();
  }
}
function fetchImage(sprites) {
  const frontSprite = document.getElementById('sprite');
  if (sprites.front_default) {
    frontSprite.src = sprites.front_default;
    frontSprite.style.display = 'block';
  } else {
    frontSprite.style.display = 'none';
  }

  const backSprite = document.getElementById('sprite2');
  if (sprites.back_default) {
    backSprite.src = sprites.back_default;
    backSprite.style.display = 'block';
  } else {
    backSprite.style.display = 'none';
  }
}

function clearResults() {
  document.getElementById('pokemon-name').textContent = '';
  document.getElementById('sprite').style.display = 'none';
  document.getElementById('sprite2').style.display = 'none';
}

function main() {
  createAppStructure();
  document.getElementById('search-button').addEventListener('click', () => {
    const query = document
      .getElementById('search-input')
      .value.trim()
      .toLowerCase();
    fetchAndPopulatePokemons(query);
  });
}

window.addEventListener('load', main);
