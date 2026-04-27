import { generateDeck } from "../data/deckData.js";
import { ShuffleDeck, DrawOneCard, CardToImage } from "./deckService.js";
import { gameState } from "../data/stateData.js";
import {
  NoSplitPayoutLogic,
  SplitRulePayoutLogic,
  UpdateHandValue,
  SaveGameState,
} from "./stateService.js";
import { Delay, MarkHandDivDoneVisually } from "./flowService.js";
import {
  CalculateResult,
  HandleValue,
  NotifyBalanceChanged,
  NotifyHandChanged,
} from "./valueService.js";
import { NewCardDrawRenderComp } from "../presentation/components/cardRender.js";
import { ShowMessageScreen } from "../presentation/components/infoRender.js";
import { GenerateResultMessage, GenerateSplitMessage } from "./infoService.js";
import {
  ActivateMenuButtons,
  DeactivateGameButtons,
  DeactivateHandButtons,
} from "./buttonService.js";
import { PlayBackgroundMusic } from "./soundService.js";

export const InitNewHand = async () => {
  const bet = Number(document.querySelector("#betInput").value);
  gameState.betState = bet;
  gameState.userState.balance -= bet;
  NotifyBalanceChanged();
  gameState.deckState = ShuffleDeck(generateDeck());
  gameState.playerHands.splice(1);
  gameState.playerHands[0].cards = [];
  gameState.playerHands[0].value = 0;
  NotifyHandChanged("player", 0);
  gameState.playerHands[0].done = false;
  gameState.isSplitActive = false;
  gameState.dealerHand.cards = [];
  gameState.dealerHand.value = 0;
  gameState.dealerHand.holeCardRevealed = false;
  NotifyHandChanged("dealer", 0);
  gameState.dealerHand.done = false;

  document.querySelector("#hands-div").replaceChildren();
  document.querySelector("#dealerCards").replaceChildren();
};

export const ProcessCardDraw = async (receiver, handIndex) => {
  UpdateHandValue(receiver, handIndex);
  HandleValue(receiver);
  NotifyHandChanged(receiver, handIndex);
  if (receiver === "player") {
    await HandleIsPlayerDone();
  }
};

export const HandleIsPlayerDone = async () => {
  if (gameState.playerHands.every((hand) => hand.done === true)) {
    const card = gameState.dealerHand.cards[0];
    document
      .querySelector("#dealerCards")
      .firstChild.replaceWith(CardToImage(card));
    gameState.dealerHand.holeCardRevealed = true;
    NotifyHandChanged("dealer", 0);
    while (!gameState.dealerHand.done) {
      await NewCardDrawRenderComp("dealer", 0);
    }
    await HandleIsDealerDone();
  }
};

const HandleOutcome = async () => {
  // 0 == lost, 1 == push, 2 == win, 3 == bj;
  const results = gameState.playerHands.map((hand) => CalculateResult(hand));
  let winloss;
  DeactivateGameButtons();
  PlayBackgroundMusic();
  await Delay(4500);
  if (gameState.isSplitActive) {
    winloss = SplitRulePayoutLogic(results);
    ShowMessageScreen(GenerateSplitMessage(results, winloss), "info");
  } else {
    winloss = NoSplitPayoutLogic(results);
    ShowMessageScreen(GenerateResultMessage(results[0], winloss), "info");
  }
  ActivateMenuButtons();
};

export const HandleIsDealerDone = async () => {
  if (gameState.dealerHand.done) {
    await HandleOutcome();
  }
};

export const HandleStay = async (handIndex) => {
  gameState.playerHands[handIndex].done = true;
  MarkHandDivDoneVisually(handIndex);
  DeactivateHandButtons(handIndex);
  await HandleIsPlayerDone();
  SaveGameState(gameState);
};

export const SetPlayerLabel = () => {
  const nameLabel = gameState.userState.name;
  document.querySelector("#player-name").textContent = nameLabel.toUpperCase();
};
