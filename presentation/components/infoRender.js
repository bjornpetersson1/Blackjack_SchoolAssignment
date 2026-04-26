export const ShowMessageScreen = (message, type) => {
  document.querySelector(`#${type}Message`).textContent = message;
  document.querySelector(`#${type}Screen`).classList.remove("hidden");
};

export const HideInfoScreen = () => {
  document
    .querySelectorAll(`.info-overlay`)
    .forEach((el) => el.classList.add("hidden"));
};

// export const ShowDecisionScreen = (message) => {
//   document.querySelector("#decisionMessage").textContent = message;
//   document.querySelector("#decisionScreen").classList.remove("hidden");
// };
