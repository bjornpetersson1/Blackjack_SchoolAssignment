export const showInfoScreen = (message) => {
  document.querySelector("#infoMessage").textContent = message;
  document.querySelector("#infoScreen").classList.remove("hidden");
};

export const hideInfoScreen = () => {
  document.querySelector("#infoScreen").classList.add("hidden");
};
