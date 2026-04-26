export const gameState = {
  userState: { name: "", password: "", balance: 0 },
  betState: 0,
  playerHands: [
    {
      cards: [],
      value: 0,
      done: false,
    },
  ],
  dealerHand: {
    cards: [],
    value: 0,
    done: false,
    holeCardRevealed: false,
  },
  deckState: [],
  isSplitActive: false,
};
