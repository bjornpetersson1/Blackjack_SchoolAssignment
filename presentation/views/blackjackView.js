import { gameState } from "../../data/stateData.js";
import { SaveGameState } from "../../services/stateService.js";
import {
  CheckIfValueIsLessOrEqual,
  NotifyBalanceChanged,
} from "../../services/valueService.js";
import { SetCurrentView } from "../../services/viewService.js";
import { NewHandRenderComp } from "../components/cardRender.js";
import { ShowMessageScreen } from "../components/infoRender.js";

const betMin = 5;
const betMax = 500;
const betStep = 5;

const clampBet = (value) => Math.min(betMax, Math.max(betMin, value));

export const InitBlackjackView = () => {
  const betInput = document.querySelector("#betInput");

  //-----------Buttons--------------
  document.querySelector("#betIncreaseButton").addEventListener("click", () => {
    betInput.value = clampBet(Number(betInput.value) + betStep);
  });

  document.querySelector("#betDecreaseButton").addEventListener("click", () => {
    betInput.value = clampBet(Number(betInput.value) - betStep);
  });

  document.querySelector("#dealNewHandButton").addEventListener("click", () => {
    if (CheckIfValueIsLessOrEqual(Number(betInput.value))) {
      NewHandRenderComp();
      SaveGameState(gameState);
    } else {
      ShowMessageScreen("Insufficent funds", "info");
    }
  });

  document
    .querySelector("#depositMoneyButton")
    .addEventListener("click", () => {
      SetCurrentView("depositDiv");
    });

  document.querySelector("#logout-button").addEventListener("click", () => {
    SetCurrentView("login-div");
  });

  //---------------EVENTS------------

  betInput.addEventListener("change", () => {
    betInput.value = clampBet(Number(betInput.value));
  });

  document.addEventListener("balanceChanged", (e) => {
    document.querySelector("#balanceDisplay").textContent =
      `${e.detail.balance} kr`;
  });
  NotifyBalanceChanged();

  document.addEventListener("handValueChanged", (e) => {
    if (e.detail.receiver === "player") {
      const scoreEl = document.querySelector(
        `#playerScore-${e.detail.handIndex}`,
      );
      if (scoreEl) scoreEl.textContent = e.detail.value;
    } else {
      const cards = gameState.dealerHand.cards;
      const visibleValue =
        cards.length < 2
          ? 0
          : cards.length === 2 && !gameState.dealerHand.holeCardRevealed
            ? cards[1].value
            : e.detail.value;
      document.querySelector("#dealerScore").textContent = visibleValue;
    }
  });
};
