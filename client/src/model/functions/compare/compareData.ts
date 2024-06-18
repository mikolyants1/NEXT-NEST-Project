import {type IComment } from "@/libs/types";

function checkData(i:IComment[],idx:number):boolean{
  if (idx == 0) return true;
  if (!i[idx]) return false;
  const date1:Date = new Date(Number(i[idx].date));
  const date2:Date = new Date(Number(i[idx-1].date));
  return date1.getDate() !== date2.getDate();
}

export default checkData