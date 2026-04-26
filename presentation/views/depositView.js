import { gameState } from "../../data/stateData.js";
import {
  CalculatorLogic,
  HandleStringToNumTransfer,
} from "../../services/depositService.js";
import { SaveGameState } from "../../services/stateService.js";
import {
  GetValueFromComponent,
  NotifyBalanceChanged,
} from "../../services/valueService.js";
import { SetCurrentView } from "../../services/viewService.js";

export const InitDepositView = () => {
  const depInput = document.querySelector("#depositInput");
  let expression = "";

  document.querySelectorAll(".calc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      expression = CalculatorLogic(expression, depInput, btn);
    });
  });

  document
    .querySelector("#backFromDepositButton")
    .addEventListener("click", () => {
      SetCurrentView("blackjack-div");
    });

  document
    .querySelector("#confirmDepositButton")
    .addEventListener("click", () => {
      HandleStringToNumTransfer("depositInput");
      depInput.value = "";
      expression = "";
      NotifyBalanceChanged();
      SaveGameState(gameState);
      SetCurrentView("blackjack-div");
    });
};
