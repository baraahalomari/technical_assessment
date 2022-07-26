"use script";

let list = document.getElementById("list");
let filterdData = document.getElementById("selected_category");

function getData() {
  //* to get data from the api
  fetch("http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[%22category1%22,%22category2%22,%22category3%22]&pretty=true")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach(function (item) {
        let card = new Card(item.fname, item.lname, item.category);
        card.render();
      })
    })
    .catch(function (error) {
      console.log(error);
    })
}

function Card(fName, lName, category) {
  this.fname = fName;
  this.lname = lName;
  this.category = category;
  allCards.push(this);
}

let allCards = [];

Card.prototype.render = function () {
  // create div container
  let container = document.createElement("div");
  list.appendChild(container);
  container.className = "card";

  // avater section
  let avater = document.createElement("div");
  avater.className = "avater";
  avater.classList.add("avater");
  avater.textContent = this.fname[0] + this.lname[0];
  container.appendChild(avater);

  // name section
  let fullName = document.createElement("h3");
  fullName.innerHTML = this.fname + " " + this.lname;
  container.appendChild(fullName);

  // category section
  let category = document.createElement("p");
  category.className = "category"
  category.innerHTML = this.category;
  container.appendChild(category);


}

getData();

filterdData.addEventListener("click", function (e) {
  //* filterd data by category
  let selectedCategory = e.target.textContent;
  let filteredCards = allCards.filter(function (card) {
    console.log(card, selectedCategory);
    return card.category === selectedCategory;
  })
  list.innerHTML = "";
  filteredCards.forEach(function (card) {
    console.log(card)
    let newCard = new Card(card.fname, card.lname, card.category);
    newCard.render();
  })
}
)
