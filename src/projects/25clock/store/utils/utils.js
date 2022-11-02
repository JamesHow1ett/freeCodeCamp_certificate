export const timeLeftParser = (timeLeft) => {
  let minutes = "";
  let seconds = "";

  if (timeLeft.minutes < 10) {
    minutes = `0${timeLeft.minutes}`;
  } else {
    minutes = `${timeLeft.minutes}`;
  }

  if (timeLeft.seconds < 10) {
    seconds = `0${timeLeft.seconds}`;
  } else {
    seconds = `${timeLeft.seconds}`;
  }

  return `${minutes}:${seconds}`;
};
