const typedtextspan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textarray = [
  "Bread ?",
  "Potato ?",
  "Chicken ?",
  "Meat ?",
  "Garlic ?",
  "onion ?",
];
const typingdelay = 100;
const erasingdelay = 100;
const newtextdelay = 2000;
let textarrayindex = 0;
let charindex = 0;
function type() {
  if (charindex < textarray[textarrayindex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedtextspan.textContent += textarray[textarrayindex].charAt(charindex);
    charindex++;
    setTimeout(type, typingdelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newtextdelay);
  }
}
function erase() {
  if (charindex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedtextspan.textContent = textarray[textarrayindex].substring(
      0,
      charindex - 1
    );
    charindex--;
    setTimeout(erase, erasingdelay);
  } else {
    cursorSpan.classList.remove("typing");
    textarrayindex++;
    if (textarrayindex >= textarray.length) textarrayindex = 0;
    setTimeout(type, typingdelay + 1100);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (textarray.length) setTimeout(type, newtextdelay + 250);
});

var plate = document.querySelector("#centerimg");
window.addEventListener("load", function () {
  setInterval(function () {
    plate.style.WebkitTransitionDuration = "2s";
    plate.style.webkitTransform = "rotate(360deg)";
  }, 100);
});
var tl = gsap.timeline();
tl.to(
  "#centerimg",
  {
    duration: 0.5,
    left: "3%",
    height: "50vh",
    width: "50vh",
  },
  "1"
);
tl.to(
  "#circ blockquote",
  {
    duration: 0.5,
    opacity: 1,
  },
  "4"
);
tl.from("#texting", {
  opacity: 0,
  duration: 1,
  width: 0,
  height: 0,
  y: 500,
});
tl.from("#textimg", {
  opacity: 0,
  duration: 1,
  delay: 1,
  x: -10,
  y: 10,
});
tl.from("#searchbar", {
  opacity: 0,
  duration: 0.5,
  x: -10,
  y: 10,
});
tl.from("#circtext", {
  opacity: 0,
  duration: 0.5,
});
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});
window.onload = function () {
  this.init();
};

function init() {
  getMealList("Milk");
}
// get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search-bar").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// create a modal
function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
const scroller = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

gsap.registerPlugin(ScrollTrigger);

scroller.on("scroll", ScrollTrigger.update);
$(function () {
  $(".title").textillate({});
});
