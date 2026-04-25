import { SetCurrentView } from "../../services/viewService.js";

export const InitLoginView = () => {
  document.querySelector("#login-btn").addEventListener("click", () => {
    SetCurrentView("blackjack-div");
  });

  document
    .querySelector("#create-new-user-btn")
    .addEventListener("click", () => {
      SetCurrentView("create-new-user-div");
    });
};
