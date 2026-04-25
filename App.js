import { InitBlackjackView } from "./presentation/views/blackjackView.js";
import { SetCurrentView } from "./services/viewService.js";
import { HideInfoScreen } from "./presentation/components/infoRender.js";
import { InitDepositView } from "./presentation/views/depositView.js";

InitBlackjackView();
InitDepositView();
SetCurrentView("blackJackDiv");
//more global buttons => break out
document
  .querySelector("#infoDismissButton")
  .addEventListener("click", HideInfoScreen);
