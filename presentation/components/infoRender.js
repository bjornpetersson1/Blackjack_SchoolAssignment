export const ShowInfoScreen = (message) => {
  document.querySelector("#infoMessage").textContent = message;
  document.querySelector("#infoScreen").classList.remove("hidden");
};

export const HideInfoScreen = () => {
  document.querySelector("#infoScreen").classList.add("hidden");
};
