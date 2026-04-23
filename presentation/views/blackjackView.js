import { HandleStay } from "../../services/gameService.js";
import {
  newCardDrawRenderComp,
  newHandRenderComp,
} from "../components/handCard.js";

export const initBlackjackView = () => {
  document.querySelector("#dealNewHandButton").addEventListener("click", () => {
    newHandRenderComp();
  });
  document
    .querySelector("#playerHitCardButton")
    .addEventListener("click", () => {
      newCardDrawRenderComp("player", 0);
    });
  document.querySelector("#playerStayButton").addEventListener("click", () => {
    HandleStay(0);
    //det här behövs uppdateras till att vara flera händer i framtiden
  });
  document.addEventListener("handValueChanged", (e) => {
    if (e.detail.receiver === "player") {
      document.querySelector("#playerScore").textContent = e.detail.value;
      //det här behövs uppdateras till att vara flera händer i framtiden
    } else {
      document.querySelector("#dealerScore").textContent = e.detail.value;
    }
  });
};
