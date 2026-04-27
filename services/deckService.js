import { gameState } from "../data/stateData.js";

export const ShuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
  }
  return deck;
};

export const CalculateCurrentHand = (hand) => {
  let total = 0;
  let aceCount = 0;

  for (let card of hand) {
    total += card.value;
    if (card.label === "ace") {
      aceCount++;
    }
  }

  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }

  return total;
};

export const DrawOneCard = (receiver, handIndex) => {
  if (receiver === "player") {
    gameState.playerHands[handIndex].cards.push(gameState.deckState.pop());
  } else {
    gameState.dealerHand.cards.push(gameState.deckState.pop());
  }
};

export const CardToImage = (card) => {
  let cardImg = document.createElement("img");
  cardImg.src = `./data/images/${card.label}_of_${card.suit}.png`;

  cardImg.classList.add("card-img");

  return cardImg;
};
