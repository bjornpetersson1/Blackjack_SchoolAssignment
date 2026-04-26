
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
  },
  deckState: [],
  activeRule: "",
};

// export const SaveState = (gameState) => {
//   localStorage.setItem(
//     gameState.userState.name,
//     JSON.stringify(gameState.userState),
//   );
// };
