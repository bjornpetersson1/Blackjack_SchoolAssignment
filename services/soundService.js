const backgroundMusic = new Audio("../data/sounds/Trummaskinen.mp3");
let volume = 0.5;

export const SetVolume = (value) => {
  volume = value;
  backgroundMusic.volume = volume;
};

export const PlayBackgroundMusic = () => {
  backgroundMusic.currentTime = 0;
  backgroundMusic.loop = true;
  backgroundMusic.volume = volume;
  backgroundMusic.play();
};

export const StopBackgroundMusic = () => {
  backgroundMusic.pause();
};

export const LoopSound = (audio) => {
  audio.currentTime = 0;
  audio.loop = true;
  audio.volume = volume;
  audio.play();
};

export const StopSound = (audio) => {
  audio.pause();
};

export const PlaySound = (path) => {
  const sound = new Audio(path);
  sound.currentTime = 0;
  sound.volume = volume;
  sound.play();
};
