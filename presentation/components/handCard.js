import { gameState } from "../../data/stateData.js";
import { dealNewHand, drawOneCard } from "../../services/gameService.js";

export const newHandRenderComp = () => {
  dealNewHand();
  document
    .querySelector("#playerHands")
    .appendChild(cardToImage(gameState.playerHands[0].cards[0]));
  document
    .querySelector("#playerHands")
    .appendChild(cardToImage(gameState.playerHands[0].cards[1]));
  document
    .querySelector("#dealerCards")
    .appendChild(cardToImage(gameState.dealerHand.cards[0]));
  document
    .querySelector("#dealerCards")
    .appendChild(cardToImage(gameState.dealerHand.cards[1]));
};

export const newCardDrawRenderComp = (receiver, handIndex) => {
  if (receiver === "player") {
    drawOneCard(receiver, handIndex);
    const cards = gameState.playerHands[handIndex].cards;
    document
      .querySelector("#playerHands")
      .appendChild(cardToImage(cards[cards.length - 1]));
  } else {
    drawOneCard(receiver, 0);
    const cards = gameState.dealerHand.cards;
    document
      .querySelector("#dealerCards")
      .appendChild(cardToImage(cards[cards.length - 1]));
  }
};

const cardToImage = (card) => {
  let cardImg = document.createElement("img");
  cardImg.src = `./data/images/${card.label}_of_${card.suit}.png`;

  cardImg.classList.add("card-img");

  

  return cardImg;
};
