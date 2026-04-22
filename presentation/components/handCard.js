import { gameState } from "../../data/stateData.js";
import { initNewHand } from "../../services/gameService.js";
import { drawOneCard } from "../../services/deckService.js";
import { Delay } from "../../services/flowService.js";

export const newHandRenderComp = async () => {
  initNewHand();
  await Delay(500);
  newCardDrawRenderComp("player", 0);
  await Delay(500);
  newCardDrawRenderComp("dealer", 0);
  await Delay(500);
  newCardDrawRenderComp("player", 0);
  await Delay(500);
  newCardDrawRenderComp("dealer", 0);
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
