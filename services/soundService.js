export const loopSound = (audio) => {
  audio.currentTime = 0;
  audio.loop = true;
  audio.play();
};

export const stopSound = (audio) => {
  audio.pause();
};

export const playSound = (path) => {
  const sound = new Audio(path);
  sound.currentTime = 0;
  sound.play();
};
