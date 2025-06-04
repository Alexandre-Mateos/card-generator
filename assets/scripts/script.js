let form = document.querySelector("#formulaire");
let resetButton = document.querySelector("#delete");
let cardName = document.querySelector("#nom-carte");
let cardType = document.querySelector("#type-carte");
let cardPower = document.querySelector("#pouvoir-carte");
let cardBoard = document.querySelector("#affichage-cartes");

if (!localStorage.getItem("collection-carte")) {
  // je créer un tableau vide
  const collection = [];
  // j'encode mon tableau avec JSON
  let cardCollection = JSON.stringify(collection);
  // je stock mon tableau encodé
  localStorage.setItem("collection-carte", cardCollection);
}

displayCard();

form.addEventListener("submit", (e) => {
  // empêche le rafraichissement automatique de la page
  //   e.preventDefault();

  // je créer une nouvelle carte à partir du formulaire
  let newCard = createCard(cardName, cardType, cardPower);

  // je stock ma carte dans la collection
  pushCardIntoCollection(newCard);
  // j'efface mon cardBoard précédent
  cardBoard.innerHTML = "";
  // j'affiche mes cartes
  displayCard();
});

resetButton.addEventListener("click", (e) => {
  eraseAll();
});

function createCard(cardName, cardType, cardPower) {
  let card = {
    name: cardName.value,
    type: cardType.value,
    power: cardPower.value,
  };
  return card;
}

function pushCardIntoCollection(card) {
  // je récupère mon tableau
  let encodedCollection = localStorage.getItem("collection-carte");
  // je décode mon tableau
  let decodedCollection = JSON.parse(encodedCollection);
  // je stocke ma carte dans le tableau;
  decodedCollection.push(card);
  // je réencode mon tableau
  decodedCollection = JSON.stringify(decodedCollection);
  // je stock mon tableau dans localStorage
  localStorage.setItem("collection-carte", decodedCollection);
}

function displayCard() {
  let stringCollection = localStorage.getItem("collection-carte");
  let arrayCollection = JSON.parse(stringCollection);

  for (let i = 0; i < arrayCollection.length; i++) {

    // création de la div qui contiendra tous les éléments de la carte
    let myCard = document.createElement("div");
    myCard.classList.add("card", "flex-grow-1");

    // affichage de la ligne identité = type (emoticone) + nom
    let paraCardIdentity = document.createElement("p");
    switch (arrayCollection[i].type) {
      case "Feu":
        paraCardIdentity.innerHTML = `🔥 ${arrayCollection[i].name}`;
        break;
      case "Eau":
        paraCardIdentity.innerHTML = `💧 ${arrayCollection[i].name}`;
        break;
      case "Terre":
        paraCardIdentity.innerHTML = `🌱 ${arrayCollection[i].name}`;
        break;
      case "Air":
        paraCardIdentity.innerHTML = `🌪️ ${arrayCollection[i].name}`;
        break;
      case "Magie":
        paraCardIdentity.innerHTML = `✨ ${arrayCollection[i].name}`;
        break;
    }

    

    // affichage de la lige pouvoir
    let paraCardPower = document.createElement("p");
    paraCardPower.innerHTML = `Pouvoir : ${arrayCollection[i].power}`;

    // j'attache les infos de ma catre dans ma carte
    myCard.insertAdjacentElement("beforeend", paraCardIdentity);
    myCard.insertAdjacentElement("beforeend", paraCardPower);
    
    // j'attache ma carte dans le html prévu
    cardBoard.insertAdjacentElement("beforeend", myCard);
  }
}

function eraseAll() {
  localStorage.clear("collection-carte");
  let allMyCArd = document.querySelectorAll(".carte");
  allMyCArd.remove();
}
