import {
  CheckValidCreateInput,
  CheckValidLoginInput,
  CreateNewUser,
  Login,
  SetActiveUserToGamestate,
} from "../../services/authService.js";
import { SetCurrentView } from "../../services/viewService.js";

export const InitLoginView = () => {
  document.querySelector("#login-btn").addEventListener("click", () => {
    const username = document.querySelector("#username-input").value;
    const password = document.querySelector("#password-input").value;
    if (CheckValidLoginInput(username, password)) {
      SetActiveUserToGamestate(Login(username, password));
      SetCurrentView("blackjack-div");
    }
  });

  document
    .querySelector("#create-new-user-btn")
    .addEventListener("click", () => {
      SetCurrentView("create-new-user-div");
    });
};
