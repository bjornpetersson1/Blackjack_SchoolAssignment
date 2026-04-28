import { gameState } from "../../data/stateData.js";
import { InitNewHand, HandleStay, ProcessCardDraw } from "../../services/gameService.js";
import { DrawOneCard } from "../../services/deckService.js";
import { Delay } from "../../services/flowService.js";
import { CardToImage } from "../../services/deckService.js";
import { CheckIfExtraRuleApplies } from "../../services/rulesService.js";
import { CreateHandDiv } from "./splitRender.js";
import { PlaySound } from "../../services/soundService.js";

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
  PlaySound("../../data/sounds/tm-snare.mp3");
  if (receiver === "player") {
    DrawOneCard(receiver, handIndex);
    const cards = gameState.playerHands[handIndex].cards;
    document
      .querySelector(`#playerHands-${handIndex}`)
      .appendChild(CardToImage(cards[cards.length - 1]));
    await ProcessCardDraw(receiver, handIndex);
    CheckIfExtraRuleApplies();
  } else {
    DrawOneCard(receiver, 0);
    const cards = gameState.dealerHand.cards;
    const card =
      cards.length === 1
        ? { label: "back", suit: "card" }
        : cards[cards.length - 1];
    document.querySelector("#dealerCards").appendChild(CardToImage(card));
    await ProcessCardDraw(receiver, 0);
  }
};
