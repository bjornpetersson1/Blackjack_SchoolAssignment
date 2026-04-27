import { gameState } from "../data/stateData.js";
import { NotifyBalanceChanged } from "./valueService.js";

export const UpdateHandValue = (owner, handIndex) => {
  if (owner === "player") {
    gameState.playerHands[handIndex].value +=
      gameState.playerHands[handIndex].cards[
        gameState.playerHands[handIndex].cards.length - 1
      ].value;
  } else {
    gameState.dealerHand.value +=
      gameState.dealerHand.cards[gameState.dealerHand.cards.length - 1].value;
  }
};

export const NoSplitPayoutLogic = (results) => {
  let winloss;
  if (results[0] === 0) {
    winloss = gameState.betState;
    return winloss;
  } else if (results[0] === 1) {
    winloss = gameState.betState;
    gameState.userState.balance += winloss;
    NotifyBalanceChanged();
    return winloss;
  } else if (results[0] === 2) {
    winloss = gameState.betState * 2;
    gameState.userState.balance += winloss;
    NotifyBalanceChanged();
    return winloss;
  } else if (results[0] === 3) {
    winloss = gameState.betState * 2.5;
    gameState.userState.balance += winloss;
    NotifyBalanceChanged();
    return winloss;
  }
};

export const SplitRulePayoutLogic = (results) => {
  // 0 == lost, 1 == push, 2 == win, 3 == bj
  const perHandBet = gameState.betState / results.length;
  let totalWinloss = 0;
  results.forEach((result) => {
    if (result === 0) {
      //loss already counted when starting hand
    } else if (result === 1) {
      totalWinloss += perHandBet;
    } else if (result === 2) {
      totalWinloss += perHandBet * 2;
    } else if (result === 3) {
      totalWinloss += perHandBet * 2.5;
    }
  });
  if (totalWinloss > 0) {
    gameState.userState.balance += totalWinloss;
    NotifyBalanceChanged();
  }
  return totalWinloss;
};

export const SaveGameState = (activeGameState) => {
  const userNameLower = activeGameState.userState.name.toLowerCase();
  localStorage.setItem(userNameLower, JSON.stringify(activeGameState));
};
