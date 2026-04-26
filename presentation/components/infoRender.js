export const ShowMessageScreen = (message, type) => {
  document.querySelector(`#${type}Message`).textContent = message;
  document.querySelector(`#${type}Screen`).classList.remove("hidden");
};

export const HideMessageScreen = () => {
  document
    .querySelectorAll(`.info-overlay`)
    .forEach((el) => el.classList.add("hidden"));
};

