export const Delay = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const MarkHandDivDoneVisually = (handIndex) => {
  const handCont = document.querySelector(`#playerHands-${handIndex}`);
  handCont.style.backgroundColor = "#dcd3b5";
};
