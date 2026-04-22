import { generateDeck } from "../data/deckData.js";
import { shuffleDeck, drawOneCard } from "./deckService.js";
import { SaveState } from "../data/stateData.js";
import { gameState } from "../data/stateData.js";
import { UpdateHandValue } from "./stateService.js";
import { Delay } from "./flowService.js";
import { HandleValue, NotifyHandChanged } from "./valueService.js";
import { newCardDrawRenderComp } from "../presentation/components/handCard.js";

export const initNewHand = async () => {
  gameState.deckState = shuffleDeck(generateDeck());
  gameState.playerHands.splice(1);
  gameState.playerHands[0].cards = [];
  gameState.playerHands[0].value = 0;
  NotifyHandChanged("player", 0);
  gameState.playerHands[0].done = false;
  gameState.dealerHand.cards = [];
  gameState.dealerHand.value = 0;
  NotifyHandChanged("dealer", 0);
  gameState.dealerHand.done = false;

  document.querySelector("#playerHands").replaceChildren();
  document.querySelector("#dealerCards").replaceChildren();
};

export const processCardDraw = (receiver, handIndex) => {
  UpdateHandValue(receiver, handIndex);
  HandleValue(receiver);
  NotifyHandChanged(receiver, handIndex);
  if (receiver === "player") {
    HandleIsPlayerDone();
  }
};

export const HandleIsPlayerDone = () => {
  if (gameState.playerHands.every((hand) => hand.done === true)) {
    while (!gameState.dealerHand.done) {
      newCardDrawRenderComp("dealer", 0);
    }
  }
};
