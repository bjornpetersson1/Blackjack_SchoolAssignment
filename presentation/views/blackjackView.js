import { gameState } from "../../data/stateData.js";
import { HandleStay } from "../../services/gameService.js";
import { SaveGameState } from "../../services/stateService.js";
import {
  CheckIfValueIsLessOrEqual,
  NotifyBalanceChanged,
} from "../../services/valueService.js";
import { SetCurrentView } from "../../services/viewService.js";
import {
  NewCardDrawRenderComp,
  NewHandRenderComp,
} from "../components/cardRender.js";
import { ShowInfoScreen } from "../components/infoRender.js";

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
      ShowInfoScreen("Insufficent funds");
    }
  });

  document
    .querySelector("#playerHitCardButton")
    .addEventListener("click", () => {
      NewCardDrawRenderComp("player", 0);
    });

  document.querySelector("#playerStayButton").addEventListener("click", () => {
    HandleStay(0);
    //det här behövs uppdateras till att vara flera händer i framtiden
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
      document.querySelector("#playerScore").textContent = e.detail.value;
      //det här behövs uppdateras till att vara flera händer i framtiden
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
