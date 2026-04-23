import { gameState } from "../data/stateData.js";

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

export const NoRulePayoutLogic = (results) => {
 if (results[0] === 0) {
      gameState.betState = 0;
    } else if (results[0] === 1) {
      gameState.userState.balance += gameState.betState;
    } else if (results[0] === 2) {
      gameState.userState.balance += gameState.betState * 2;
    } else if (results[0] === 3) {
      gameState.userState.balance += gameState.betState * 2.5;
    } 
}

export const SplitRulePayoutLogic = (results) => {
//  if (results[0] === 0) {
//       gameState.betState = 0;
//     } else if (results[0] === 1) {
//       gameState.userState.balance += gameState.betState;
//     } else if (results[0] === 2) {
//       gameState.userState.balance += gameState.betState * 2;
//     } else if (results[0] === 3) {
//       gameState.userState.balance += gameState.betState * 2.5;
//     } 
}

export const DoubleDownRulePayoutLogic = (results) => {
//  if (results[0] === 0) {
//       gameState.betState = 0;
//     } else if (results[0] === 1) {
//       gameState.userState.balance += gameState.betState;
//     } else if (results[0] === 2) {
//       gameState.userState.balance += gameState.betState * 2;
//     } else if (results[0] === 3) {
//       gameState.userState.balance += gameState.betState * 2.5;
//     } 
}
