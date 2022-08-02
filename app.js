// The Recipe Puppy API used in the course is broken
// Please use this replacement API URL "https://recipes.beginnerjavascript.com/api"

const baseURL = "https://recipes.beginnerjavascript.com/api";
const proxy = "https://cors-anywhere.herokuapp.com/";
const form = document.querySelector("form.search");
const recipesGrid = document.querySelector(".recipes");

recipesGrid.textContent = "Search for a recipe that you want to find...";

async function fetchRecipes(query) {
  const res = await fetch(`${proxy}${baseURL}?q=${query}`);
  const data = await res.json();
  return data;
}

async function handleSubmit(event) {
  event.preventDefault();
  const el = event.currentTarget;
  console.log(el);
  console.log(form.query.value);
  fetchAndDisplay(form.query.value);
}

async function fetchAndDisplay(query) {
  // turn the form off
  form.submit.disabled = true;
  // submit the search
  const recipes = await fetchRecipes(query);
  console.log(recipes);
  form.submit.disabled = false;
  displayRecipes(recipes.results);
}

function displayRecipes(recipes) {
  console.log("Creating HTML");
  const html = recipes.map(
    (recipe) =>
      `<div class="recipe">
      <h2>${recipe.title}</h2>
      <p>${recipe.ingredients}</p>
      ${
        recipe.thumbnail &&
        `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`
      }
      <a href="${recipe.href}">View Recipe →</a>
    </div>`
  );
  recipesGrid.innerHTML = html.join("");
}

form.addEventListener("submit", handleSubmit);

// fetchAndDisplay('pizza');
