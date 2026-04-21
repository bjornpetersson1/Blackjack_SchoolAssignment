import { generateDeck } from "../data/deckData.js";
import { shuffleDeck } from "./deckService.js";
import { SaveState } from "../data/stateData.js";
import { gameState } from "../data/stateData.js";
import { CalculateHand } from "./stateService.js";
import { Delay } from "./flowService.js";

export const dealNewHand = async () => {
  gameState.deckState = generateDeck();
  gameState.deckState = shuffleDeck(gameState.deckState);
  gameState.playerHands[0].cards = [];
  gameState.dealerHand.cards = [];

  drawOneCard("player", 0);
  // await Delay(500);
  drawOneCard("dealer", 0);
  // await Delay(500);
  drawOneCard("player", 0);
  // await Delay(500);
  drawOneCard("dealer", 0);
  // await Delay(500);
};

export const drawOneCard = (receiver, handIndex) => {
  if (receiver === "player") {
    gameState.playerHands[handIndex].cards.push(gameState.deckState.pop());
  } else {
    gameState.dealerHand.cards.push(gameState.deckState.pop());
  }

  CalculateHand(receiver, handIndex);
  document.dispatchEvent(
    new CustomEvent("handValueChanged", {
      detail: {
        receiver: receiver,
        value:
          receiver === "player"
            ? gameState.playerHands[handIndex].value
            : gameState.dealerHand.value,
      },
    }),
  );
};
