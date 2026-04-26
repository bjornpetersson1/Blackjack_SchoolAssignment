import { InitBlackjackView } from "./presentation/views/blackjackView.js";
import { SetCurrentView } from "./services/viewService.js";
import { HideInfoScreen } from "./presentation/components/infoRender.js";
import { InitDepositView } from "./presentation/views/depositView.js";
import { InitLoginView } from "./presentation/views/loginView.js";
import { InitCreateNewUserView } from "./presentation/views/createNewUserView.js";

const logoTemplate = document.getElementById("logo-template");
document.querySelectorAll(".board").forEach((board) => {
  board.prepend(logoTemplate.content.cloneNode(true));
});

document
  .querySelector("#decisionYesButton")
  .addEventListener("click", () => {});
document.querySelector("#decisionNoButton").addEventListener("click", () => {});

//more global buttons => break out
document.querySelector(".dismiss").addEventListener("click", HideInfoScreen);

InitBlackjackView();
InitDepositView();
InitLoginView();
InitCreateNewUserView();
SetCurrentView("login-div");
