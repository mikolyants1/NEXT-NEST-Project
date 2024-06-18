export function getTime(time:number):string{
  const date:Date = new Date(time);
  const zeroOur:string = `${date.getHours() < 10 ? "0" : ""}`;
  const zeroMin:string = `${date.getMinutes() < 10 ? "0" : ""}`;
  const our:string = `${zeroOur}${date.getHours()}`;
  const min:string = `${zeroMin}${date.getMinutes()}`;
  return `${our}:${min}`;
}