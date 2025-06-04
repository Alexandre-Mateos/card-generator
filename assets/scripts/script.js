let form = document.querySelector("#formulaire");
let cardName = document.querySelector("#nom-carte");
let cardType = document.querySelector("#type-carte");
let cardPower = document.querySelector("#pouvoir-carte");

// je créer un tableau vide
const collection = [];
// j'encode mon tableau avec JSON
let cardCollection = JSON.stringify(collection);
// je stock mon tableau encodé
localStorage.setItem("collection-carte", cardCollection);

form.addEventListener("submit", (e) => {
  // empêche le rafraichissment automatique de la page
  e.preventDefault();

  // je créer une nouvelle carte à partir du formulaire
  let newCard = createCard(cardName, cardType, cardPower);

  // je récupère mon tableau
  let encodedCollection = localStorage.getItem("collection-carte");
  // je décode mon tableau
  let decodedCollection = JSON.parse(encodedCollection);
  // je stocke ma carte dans le tableau;
  decodedCollection.push(newCard);
  // je réencode mon tableau
  decodedCollection = JSON.stringify(decodedCollection);
  // je stock mon tableau dans localStorage
  localStorage.setItem("collection-carte", decodedCollection);
});

function createCard(cardName, cardType, cardPower) {
  let card = {
    name: cardName.value,
    type: cardType.value,
    power: cardPower.value,
  };
  return card;
}
