import { gameState } from "../data/stateData.js";
import { DeactivateHandButtons } from "./buttonService.js";
import { MarkHandDivDoneVisually } from "./flowService.js";

export const HandleValue = (owner) => {
  if (owner === "player") {
    let index = 0;
    gameState.playerHands.forEach((hand) => {
      if (hand.value == 21) {
        hand.done = true;
        MarkHandDivDoneVisually(index);
        DeactivateHandButtons(index);
      }
      if (hand.value > 21) {
        hand.done = true;
        MarkHandDivDoneVisually(index);
        DeactivateHandButtons(index);
      }
      index++;
    });
  } else {
    if (gameState.dealerHand.value >= 17) {
      gameState.dealerHand.done = true;
    }
  }
};

export const NotifyHandChanged = (receiver, handIndex) => {
  document.dispatchEvent(
    new CustomEvent("handValueChanged", {
      detail: {
        receiver,
        handIndex,
        value:
          receiver === "player"
            ? gameState.playerHands[handIndex].value
            : gameState.dealerHand.value,
      },
    }),
  );
};

export const CalculateResult = (playerHand) => {
  // 0 == lost, 1 == push, 2 == win, 3 == bj;
  const playerValue = playerHand.value;
  const dealerValue = gameState.dealerHand.value;

  if (playerValue > 21) return 0;
  else if (
    playerValue === 21 &&
    playerHand.cards.length === 2 &&
    dealerValue !== 21
  )
    return 3;
  else if (dealerValue > 21) return 2;
  else if (playerValue === dealerValue) return 1;
  else if (playerValue > dealerValue) return 2;
  else return 0;
};

export const GetValueFromComponent = (id) => {
  return document.querySelector(`#${id}`).value;
};

export const NotifyBalanceChanged = () => {
  document.dispatchEvent(
    new CustomEvent("balanceChanged", {
      detail: { balance: gameState.userState.balance },
    }),
  );
};

export const CheckIfValueIsLessOrEqual = (tryValue) => {
  if (
    tryValue < gameState.userState.balance ||
    tryValue === gameState.userState.balance
  ) {
    return true;
  } else {
    return false;
  }
};
