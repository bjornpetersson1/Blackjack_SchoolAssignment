import { gameState } from "../data/stateData.js";
import { NewCardDrawRenderComp } from "../presentation/components/cardRender.js";
import {
  ShowMessageScreen,
  HideMessageScreen,
} from "../presentation/components/infoRender.js";
import { HandleIsPlayerDone, HandleStay } from "./gameService.js";
import { NotifyHandChanged } from "./valueService.js";
import { CreateHandDiv } from "../presentation/components/splitRender.js";
import { MarkHandDivDoneVisually } from "./flowService.js";

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
      gameState.isSplitActive = true;
      SplitLogic(splitIndex);
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
  MarkHandDivDoneVisually(0);
  HandleIsPlayerDone();
};

const SplitLogic = (index) => {
  const handsCount = gameState.playerHands.length;
  gameState.playerHands.push({ cards: [], value: 0, done: false });

  const movedCard = gameState.playerHands[index].cards.pop();
  gameState.playerHands[index].value -= movedCard.value;
  gameState.playerHands[handsCount].cards.push(movedCard);
  gameState.playerHands[handsCount].value += movedCard.value;

  CreateHandDiv(handsCount, NewCardDrawRenderComp, HandleStay);

  const sourceArea = document.querySelector(`#playerHands-${index}`);
  const targetArea = document.querySelector(`#playerHands-${handsCount}`);
  targetArea.appendChild(sourceArea.lastChild);

  NewCardDrawRenderComp("player", index);
  NewCardDrawRenderComp("player", handsCount);
};
