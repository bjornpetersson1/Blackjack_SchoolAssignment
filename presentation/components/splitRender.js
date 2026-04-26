export const CreateHandDiv = (handIndex, onHit, onStay) => {
  const handDiv = document.createElement("div");
  handDiv.id = `hands-${handIndex}`;
  handDiv.className = "hand-div";

  const cardsPanel = document.createElement("div");
  cardsPanel.className = "cards-panel";

  const cardsArea = document.createElement("div");
  cardsArea.id = `playerHands-${handIndex}`;
  cardsArea.className = "cards-area";
  cardsPanel.appendChild(cardsArea);

  const scoreRow = document.createElement("div");
  scoreRow.className = "score-row";
  scoreRow.textContent = "SCORE: ";

  const scoreSpan = document.createElement("span");
  scoreSpan.id = `playerScore-${handIndex}`;
  scoreSpan.className = "score-value";
  scoreSpan.textContent = "--";
  scoreRow.appendChild(scoreSpan);

  const actionButtons = document.createElement("div");
  actionButtons.className = "player-action-buttons";

  const hitButton = document.createElement("button");
  hitButton.id = `playerHitCardButton-${handIndex}`;
  hitButton.className = "btn";
  hitButton.textContent = "[ HIT ]";
  hitButton.addEventListener("click", () => onHit("player", handIndex));

  const stayButton = document.createElement("button");
  stayButton.id = `playerStayButton-${handIndex}`;
  stayButton.className = "btn";
  stayButton.textContent = "[ STAY ]";
  stayButton.addEventListener("click", () => onStay(handIndex));

  actionButtons.appendChild(hitButton);
  actionButtons.appendChild(stayButton);

  handDiv.appendChild(cardsPanel);
  handDiv.appendChild(scoreRow);
  handDiv.appendChild(actionButtons);

  document.querySelector("#hands-div").appendChild(handDiv);
};
