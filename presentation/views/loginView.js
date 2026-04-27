import {
  CheckValidCreateInput,
  CheckValidLoginInput,
  CreateNewUser,
  Login,
  SetActiveUserToGamestate,
} from "../../services/authService.js";
import { SetPlayerLabel } from "../../services/gameService.js";
import { NotifyBalanceChanged } from "../../services/valueService.js";
import { SetCurrentView } from "../../services/viewService.js";
import { ShowMessageScreen } from "../components/infoRender.js";
import { PlayBackgroundMusic } from "../../services/soundService.js";

export const InitLoginView = () => {
  document.querySelector("#login-btn").addEventListener("click", () => {
    const username = document.querySelector("#username-input").value;
    const password = document.querySelector("#password-input").value;
    if (CheckValidLoginInput(username, password)) {
      SetActiveUserToGamestate(Login(username, password));
      NotifyBalanceChanged();
      SetPlayerLabel();
      PlayBackgroundMusic();
      SetCurrentView("blackjack-div");
    }
  });

  document
    .querySelector("#create-new-user-btn")
    .addEventListener("click", () => {
      SetCurrentView("create-new-user-div");
    });
};
