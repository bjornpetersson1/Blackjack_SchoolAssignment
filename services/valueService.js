import { gameState } from "../data/stateData.js";

export const HandleValue = (owner) => {
  if (owner === "player") {
    gameState.playerHands.forEach((hand) => {
      if (hand.value == 21) {
        hand.done = true;
      }
      if (hand.value > 21) {
        hand.done = true;
      }
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
        value:
          receiver === "player"
            ? gameState.playerHands[handIndex].value
            : gameState.dealerHand.value,
      },
    }),
  );
};
