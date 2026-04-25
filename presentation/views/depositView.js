import { gameState } from "../../data/stateData.js";
import {
  CalculatorLogic,
  HandleStringToNumTransfer,
  ResetDepositView,
} from "../../services/depositService.js";
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
      CalculatorLogic(expression, depInput);
    });
  });

  document
    .querySelector("#backFromDepositButton")
    .addEventListener("click", () => {
      SetCurrentView("blackJackDiv");
    });

  document
    .querySelector("#confirmDepositButton")
    .addEventListener("click", () => {
      HandleStringToNumTransfer("depositInput", gameState.userState.balance);
      ResetDepositView(depInput.value, expression);
      NotifyBalanceChanged();
      SetCurrentView("blackJackDiv");
    });
};
