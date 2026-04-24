import { InitBlackjackView } from "./presentation/views/blackjackView.js";
import { SetCurrentView } from "./services/viewService.js";
import { HideInfoScreen } from "./presentation/components/infoRender.js";

InitBlackjackView();
SetCurrentView("blackJackDiv");
//more global buttons => break out
document
  .querySelector("#infoDismissButton")
  .addEventListener("click", HideInfoScreen);
