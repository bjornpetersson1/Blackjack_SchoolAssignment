import { generateDeck } from "../data/deckData.js";
import { shuffleDeck } from "./deckService.js";
import { SaveState } from "../data/stateData.js";
import { gameState } from "../data/stateData.js";

export const dealNewHand = () => {
  gameState.deckState = generateDeck();
  gameState.deckState = shuffleDeck(gameState.deckState);
  gameState.playerHands[0].cards = [];
  gameState.dealerHand.cards = [];

  drawOneCard("player", 0);
  drawOneCard("dealer", 0);
  drawOneCard("player", 0);
  drawOneCard("dealer", 0);
};

export const drawOneCard = (receiver, handIndex) => {
  if (receiver === "player") {
    gameState.playerHands[handIndex].cards.push(gameState.deckState.pop());
  } else {
    gameState.dealerHand.cards.push(gameState.deckState.pop());
  }
};
