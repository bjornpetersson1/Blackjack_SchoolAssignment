import { initBlackjackView } from "./presentation/views/blackjackView.js";
import { SetCurrentView } from "./services/viewService.js";
import { hideInfoScreen } from "./presentation/components/infoRender.js";

initBlackjackView();
SetCurrentView("blackJackDiv");
//more global buttons => break out
document
  .querySelector("#infoDismissButton")
  .addEventListener("click", hideInfoScreen);
