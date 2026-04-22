import { generateDeck } from "../data/deckData.js";
import { shuffleDeck, drawOneCard } from "./deckService.js";
import { SaveState } from "../data/stateData.js";
import { gameState } from "../data/stateData.js";
import { UpdateHandValue } from "./stateService.js";
import { Delay } from "./flowService.js";
import { HandleValue, NotifyHandChanged } from "./valueService.js";
import { newCardDrawRenderComp } from "../presentation/components/handCard.js";

export const dealNewHand = async () => {
  gameState.deckState = shuffleDeck(generateDeck());
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
  HandleIsPlayerDone();
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
