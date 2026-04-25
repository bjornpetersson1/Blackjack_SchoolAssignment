import { SetCurrentView } from "../../services/viewService.js";
import {
  CheckValidCreateInput,
  CreateNewUser,
  SaveGameState,
} from "../../services/authService.js";

export const InitCreateNewUserView = () => {
  document.querySelector("#create-btn").addEventListener("click", () => {
    const username = document.querySelector("#create-username-input").value;
    const password = document.querySelector("#create-password-input").value;
    if (CheckValidCreateInput(username, password)) {
      SaveGameState(CreateNewUser(username, password));
      SetCurrentView("login-div");
    } else {
      SetCurrentView("create-new-user-div");
    }
  });

  document.querySelector("#cancel-btn").addEventListener("click", () => {
    SetCurrentView("login-div");
  });
};
