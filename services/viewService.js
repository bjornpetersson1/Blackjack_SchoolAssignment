export const SetCurrentView = (activeDivId) => {
  document.querySelectorAll(".view").forEach((view) => {
    view.style.display = "none";
  });
  document.querySelector("#" + activeDivId).style.display = "block";
};
