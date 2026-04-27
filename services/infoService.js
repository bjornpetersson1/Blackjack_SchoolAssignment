import { gameState } from "../data/stateData.js";

export const GenerateResultMessage = (result, winloss) => {
  // 0 == lost, 1 == push, 2 == win, 3 == bj;
  if (result === 0) {
    return `You lost :( \n The casino thanks for ${winloss} kr`;
  } else if (result === 1) {
    return `Push... \n You can keep your bet`;
  } else if (result === 2) {
    return `You won! \n ${winloss} kr comin' your way`;
  } else if (result === 3) {
    return `BLACKJACK! \nOur money is your money\n ${winloss} kr is yours`;
  }
};

export const GenerateSplitMessage = (results, winloss) => {
  let message = "Your hands did ";
  results.forEach((result) => {
    if (result === 0) {
      message += "lose, ";
    } else if (result === 1) {
      message += "push, ";
    } else if (result === 2) {
      message += "win, ";
    } else if (result === 3) {
      message += "win by blackjack, ";
    }
  });
  message = message.slice(0, -2);
  if (winloss === 0) {
    message += ` and you lost a total of ${gameState.betState} kr`;
  } else {
    message += ` and your payout was a total of ${winloss} kr`;
  }
  return message;
};
