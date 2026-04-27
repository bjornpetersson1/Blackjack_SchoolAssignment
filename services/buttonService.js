const menuButtonsId = [
  "betDecreaseButton",
  "betIncreaseButton",
  "dealNewHandButton",
  "depositMoneyButton",
  "logout-button",
];
const gameButtonsId = ["hit", "stay"];

export const ActivateButton = (id) => {
  document.querySelector(`#${id}`).disabled = false;
};
export const DeactivateButton = (id) => {
  document.querySelector(`#${id}`).disabled = true;
};
export const ActivateMenuButtons = () => {
  menuButtonsId.forEach((id) => {
    ActivateButton(id);
  });
};
export const DeactivateMenuButtons = () => {
  menuButtonsId.forEach((id) => {
    DeactivateButton(id);
  });
};
export const ActivateGameButtons = () => {
  document.querySelectorAll(".player-action-buttons .btn").forEach((btn) => {
    btn.disabled = false;
  });
};
export const DeactivateGameButtons = () => {
  document.querySelectorAll(".player-action-buttons .btn").forEach((btn) => {
    btn.disabled = true;
  });
};

export const DeactivateHandButtons = (handIndex) => {
  DeactivateButton(`playerHitCardButton-${handIndex}`);
  DeactivateButton(`playerStayButton-${handIndex}`);
};
