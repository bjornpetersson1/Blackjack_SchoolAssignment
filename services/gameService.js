import { generateDeck } from "../data/deckData.js";
import { ShuffleDeck, DrawOneCard, CardToImage } from "./deckService.js";
import { gameState } from "../data/stateData.js";
import {
  DoubleDownRulePayoutLogic,
  NoRulePayoutLogic,
  SplitRulePayoutLogic,
  UpdateHandValue,
  SaveGameState,
} from "./stateService.js";
import { Delay } from "./flowService.js";
import {
  CalculateResult,
  HandleValue,
  NotifyBalanceChanged,
  NotifyHandChanged,
} from "./valueService.js";
import { NewCardDrawRenderComp } from "../presentation/components/cardRender.js";
import { ShowMessageScreen } from "../presentation/components/infoRender.js";
import { GenerateResultMessage } from "./infoService.js";

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
  gameState.dealerHand.cards = [];
  gameState.dealerHand.value = 0;
  gameState.dealerHand.holeCardRevealed = false;
  NotifyHandChanged("dealer", 0);
  gameState.dealerHand.done = false;

  document.querySelector("#playerHands").replaceChildren();
  document.querySelector("#dealerCards").replaceChildren();
};

export const ProcessCardDraw = (receiver, handIndex) => {
  UpdateHandValue(receiver, handIndex);
  HandleValue(receiver);
  NotifyHandChanged(receiver, handIndex);
  if (receiver === "player") {
    HandleIsPlayerDone();
  }
};

export const HandleIsPlayerDone = () => {
  if (gameState.playerHands.every((hand) => hand.done === true)) {
    const card = gameState.dealerHand.cards[0];
    document
      .querySelector("#dealerCards")
      .firstChild.replaceWith(CardToImage(card));
    gameState.dealerHand.holeCardRevealed = true;
    NotifyHandChanged("dealer", 0);
    while (!gameState.dealerHand.done) {
      NewCardDrawRenderComp("dealer", 0);
    }
    HandleIsDealerDone();
  }
};

const HandleOutcome = () => {
  // 0 == lost, 1 == push, 2 == win, 3 == bj;
  const results = gameState.playerHands.map((hand) => CalculateResult(hand));
  let winloss;
  if (gameState.activeRule === "split") {
    winloss = SplitRulePayoutLogic(results);
    // showInfoScreen(GenerateResultMessage(results, winloss)); //DU MÅSTE LÖSA DEN HÄR HUVUDVÄRKEN
  } else if (gameState.activeRule === "doubleDown") {
    winloss = DoubleDownRulePayoutLogic(results);
  } else {
    winloss = NoRulePayoutLogic(results);
  }
  ShowMessageScreen(GenerateResultMessage(results[0], winloss), "info");
  //here i do something after updating gamestate
};

export const HandleIsDealerDone = () => {
  if (gameState.dealerHand.done) {
    HandleOutcome();
  }
};

export const HandleStay = (handIndex) => {
  gameState.playerHands[handIndex].done = true;
  HandleIsPlayerDone();
  SaveGameState(gameState);
};
