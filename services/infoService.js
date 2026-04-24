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
