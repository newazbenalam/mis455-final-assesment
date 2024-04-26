var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var apiData = []; // Api data cache

async function connectSearch(name) {
  return await fetch(url + name)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

async function onSearch(value) {
  var searchid = "";
  if (value) {
    searchid = value;
  } else {
    searchid = document.getElementById("searchid").value;
    if (searchid === "") {
      window.location.reload();
    }
  }

  document.getElementById("result-view").innerHTML = "";
  document.getElementById("middle-title").textContent = "Search Result(s)";
  var oldContent = document.getElementById("result-view");

  apiData = await connectSearch(encodeURIComponent(searchid));
  console.log(apiData.meal);

  var items = apiData.meals;
  var itemsLength = 5;
  if (items.length < itemsLength) {
    itemsLength = items.length;
  }

  var newContent = document.createElement("div");
  for (var i = 0; i < itemsLength; i++) {
    var newContent = document.createElement("div");
    newContent.className = "item-popular px-3";

    newContent.innerHTML = `
            <p>${items[i].idMeal}</p>
            <p id="air" class="value"><img width="40px" style="text-align: center;" src="${items[i].strMealThumb}" alt=""> ${items[i].strMeal}</p>
            <p >Category: ${items[i].strCategory}</p><br>
            <p ><strong>Instructions:</strong> ${items[i].strInstructions}</p>
      `;

    oldContent.appendChild(newContent);
  }
  
  if (items.length > 5 ){
    var oldContent = document.getElementById("more-view");
    var newContent = document.createElement("div");
  
    newContent.innerHTML = `
                <div class="item-popular w-auto px-4">
                <input type="button" id="air" class="popular-btn" value="Show All" onclick="showMore()" >
                </div>
      `;
    oldContent.appendChild(newContent);
  
  }
}

function showMore(){
  document.getElementById("more-view").innerHTML = "";


  var oldContent = document.getElementById("result-view");
  var items = apiData.meals;

  for (var i = 5; i < items.length; i++) {
    var newContent = document.createElement("div");
    newContent.className = "item-popular px-3";

    newContent.innerHTML = `
            <p>${items[i].idMeal}</p>
            <p id="air" class="value"><img width="40px" style="text-align: center;" src="${items[i].strMealThumb}" alt=""> ${items[i].strMeal}</p>
            <p >Category: ${items[i].strCategory}</p><br>
            <p ><strong>Instructions:</strong> ${items[i].strInstructions}</p>
      `;

    oldContent.appendChild(newContent);
  }
}

function darkMode() {
  if (document.body.style.backgroundColor == "black") {
    document.body.style.backgroundColor = "white";
    document.getElementById("body").style.background =
      "linear-gradient(0deg, var(--primary-color) 0%, var(--bg-color) 60%)";
    document.body.style.color = "black";
    document.body.style.dev.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    document.getElementById("body").style.background =
      "linear-gradient(0deg, #261b2e 0%, #868bb9 60%)";
    document.body.style.color = "white";
    document.body.style.dev.color = "white";
  }
  console.log(document.body.style.backgroundColor);
}

function pressed(event) {
  if (event.keyCode === 13) {
    console.log("Enter key pressed!");
    onSearch();
  }
}

function gotoSearch(value) {
  onSearch(value);
}
