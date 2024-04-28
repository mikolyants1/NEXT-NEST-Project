export function getTime(time:string):string{
  const date:Date = new Date(Number(time));
  const zeroOur:string = `${date.getHours() < 10 ? "0" : ""}`;
  const zeroMin:string = `${date.getMinutes() < 10 ? "0" : ""}`;
  const our:string = `${zeroOur}${date.getHours()}`;
  const min:string = `${zeroMin}${date.getMinutes()}`;
  return `${our}:${min}`;
}