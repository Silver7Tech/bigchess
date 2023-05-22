export function getFormatedTime(time: number) {
  const formated = new Date(0);
  formated.setMilliseconds(time);
  return formated.toISOString().substring(14, 19);
}
export const PiecesCount = {
  k: 1,
  q: 1,
  b: 2,
  n: 2,
  r: 2,
  p: 8,
};
