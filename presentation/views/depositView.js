import { gameState } from "../../data/stateData.js";
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
      const key = btn.dataset.key;
      if (key === "C") {
        expression = "";
      } else if (key === "=") {
        expression = String(eval(expression));
      } else {
        expression += key;
      }
      depInput.value = expression;
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
      const value = Math.round(Number(GetValueFromComponent("depositInput")));
      gameState.userState.balance += value;
      depInput.value = "";
      expression = "";
      NotifyBalanceChanged();
      SetCurrentView("blackJackDiv");
    });
};
