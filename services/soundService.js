export const LoopSound = (audio) => {
  audio.currentTime = 0;
  audio.loop = true;
  audio.play();
};

export const StopSound = (audio) => {
  audio.pause();
};

export const PlaySound = (path) => {
  const sound = new Audio(path);
  sound.currentTime = 0;
  sound.play();
};
