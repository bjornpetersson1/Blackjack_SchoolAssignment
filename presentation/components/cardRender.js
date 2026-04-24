import { gameState } from "../../data/stateData.js";
import { InitNewHand } from "../../services/gameService.js";
import { DrawOneCard } from "../../services/deckService.js";
import { Delay } from "../../services/flowService.js";
import { CardToImage } from "../../services/deckService.js";

export const NewHandRenderComp = async () => {
  InitNewHand();
  await Delay(500);
  NewCardDrawRenderComp("player", 0);
  await Delay(500);
  NewCardDrawRenderComp("dealer", 0);
  await Delay(500);
  NewCardDrawRenderComp("player", 0);
  await Delay(500);
  NewCardDrawRenderComp("dealer", 0);
};

export const NewCardDrawRenderComp = (receiver, handIndex) => {
  if (receiver === "player") {
    DrawOneCard(receiver, handIndex);
    const cards = gameState.playerHands[handIndex].cards;
    document
      .querySelector("#playerHands")
      .appendChild(CardToImage(cards[cards.length - 1]));
  } else {
    DrawOneCard(receiver, 0);
    const cards = gameState.dealerHand.cards;
    document
      .querySelector("#dealerCards")
      .appendChild(CardToImage(cards[cards.length - 1]));
  }
};
