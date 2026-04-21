import { gameState } from "../data/stateData.js";

export const CalculateHand = (owner, handIndex) => {
  if (owner === "player") {
    gameState.playerHands[handIndex].value +=
      gameState.playerHands[handIndex].cards[
        gameState.playerHands[handIndex].cards.length - 1
      ].value;
  } else {
    gameState.dealerHand.value +=
      gameState.dealerHand.cards[gameState.dealerHand.cards.length - 1].value;
  }
};
