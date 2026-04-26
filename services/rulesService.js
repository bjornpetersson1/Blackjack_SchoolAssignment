import { gameState } from "../data/stateData.js";
import { NewCardDrawRenderComp } from "../presentation/components/cardRender.js";
import {
  ShowMessageScreen,
  HideMessageScreen,
} from "../presentation/components/infoRender.js";
import { HandleIsPlayerDone } from "./gameService.js";
import { NotifyHandChanged } from "./valueService.js";

export const CheckIfExtraRuleApplies = () => {
  if (
    gameState.playerHands[0].value >= 9 &&
    gameState.playerHands[0].value <= 11 &&
    gameState.playerHands[0].cards.length == 2
  ) {
    ShowMessageScreen("Double down?", "choice");
    document.querySelector("#choiceYesButton").onclick = () => {
      HideMessageScreen();
      DoubleDownLogic();
    };
  }
  const splitIndex = gameState.playerHands.findIndex(
    (hand) =>
      hand.cards.length === 2 &&
      !hand.done &&
      hand.cards[0].value === hand.cards[1].value,
  );
  if (splitIndex != -1) {
    ShowMessageScreen("Split hand?", "choice");
    document.querySelector("#choiceYesButton").onclick = () => {
      HideMessageScreen();
      SplitLogic();
    };
  }
};

const DoubleDownLogic = () => {
  const bet = gameState.betState;
  gameState.betState += bet;
  gameState.userState.balance -= bet;
  NewCardDrawRenderComp("player", 0);
  NotifyHandChanged("player", 0);
  gameState.playerHands[0].done = true;
  HandleIsPlayerDone();
};
const SplitLogic = () => {};
