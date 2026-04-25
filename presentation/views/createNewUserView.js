import { SetCurrentView } from "../../services/viewService.js";

export const InitCreateNewUserView = () => {
  document.querySelector("#create-btn").addEventListener("click", () => {
    SetCurrentView("login-div");
  });

  document.querySelector("#cancel-btn").addEventListener("click", () => {
    SetCurrentView("login-div");
  });
};
