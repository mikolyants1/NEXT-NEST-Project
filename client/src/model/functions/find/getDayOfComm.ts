export function getDayOfComment(time:string):string{
  const date:Date = new Date(Number(time));
  const month:string = date.toLocaleDateString("en-EN",{month:"long"});
  const dayNum:number = date.getDate();
  return `${dayNum < 10 ? 0 : ""}${dayNum} ${month}`;
}