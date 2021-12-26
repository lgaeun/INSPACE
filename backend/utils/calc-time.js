const m = 60;
const h = m * 60;

module.exports = (milsectime) => {
  const time = Math.floor(milsectime / 1000);
  const hour = Math.floor(time / h);
  const min = Math.floor((time - hour * h) / m);
  const sec = Math.floor(time - hour * h - min * m);
  return { hour, min, sec };
};
