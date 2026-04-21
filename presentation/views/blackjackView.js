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
  document
    .querySelector("#dealerHitCardButton")
    .addEventListener("click", () => {
      newCardDrawRenderComp("dealer", 0);
    });
};
