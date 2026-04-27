import { gameState } from "../data/stateData.js";
import { NotifyHandChanged } from "./valueService.js";

export const SetCurrentView = (activeDivId) => {
  document.querySelectorAll(".view").forEach((view) => {
    view.style.display = "none";
  });
  document.querySelector("#" + activeDivId).style.display = "block";
};

export const ClearView = () => {
  gameState.betState = 0;
  gameState.playerHands.splice(1);
  gameState.playerHands[0].cards = [];
  gameState.playerHands[0].value = 0;
  gameState.playerHands[0].done = false;
  gameState.dealerHand.cards = [];
  gameState.dealerHand.value = 0;
  gameState.dealerHand.done = false;
  gameState.dealerHand.holeCardRevealed = false;
  gameState.isSplitActive = false;

  document.querySelector("#hands-div").replaceChildren();
  document.querySelector("#dealerCards").replaceChildren();
  NotifyHandChanged("dealer", 0);
};
