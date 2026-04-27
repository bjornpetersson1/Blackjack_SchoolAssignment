import { gameState } from "../../data/stateData.js";
import { InitNewHand, HandleStay } from "../../services/gameService.js";
import { DrawOneCard } from "../../services/deckService.js";
import { Delay } from "../../services/flowService.js";
import { CardToImage } from "../../services/deckService.js";
import { CheckIfExtraRuleApplies } from "../../services/rulesService.js";
import { CreateHandDiv } from "./splitRender.js";

export const NewHandRenderComp = async () => {
  InitNewHand();
  CreateHandDiv(0, NewCardDrawRenderComp, HandleStay);
  await NewCardDrawRenderComp("player", 0);
  await NewCardDrawRenderComp("dealer", 0);
  await NewCardDrawRenderComp("player", 0);
  await NewCardDrawRenderComp("dealer", 0);
};

export const NewCardDrawRenderComp = async (receiver, handIndex) => {
  await Delay(500);
  if (receiver === "player") {
    await DrawOneCard(receiver, handIndex);
    const cards = gameState.playerHands[handIndex].cards;
    document
      .querySelector(`#playerHands-${handIndex}`)
      .appendChild(CardToImage(cards[cards.length - 1]));
    CheckIfExtraRuleApplies();
  } else {
    await DrawOneCard(receiver, 0);
    const cards = gameState.dealerHand.cards;
    const card =
      cards.length === 1
        ? { label: "back", suit: "card" }
        : cards[cards.length - 1];
    document.querySelector("#dealerCards").appendChild(CardToImage(card));
  }
};
