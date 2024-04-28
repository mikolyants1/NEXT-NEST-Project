import {type ILogo } from "@/components/libs/types/type";

export function createLogo():ILogo {
  const first:string[] = ['gold','green','orange'];
  const second:string[] = ['red','blue','blueviolet'];
  const ranFirst:number = Math.floor(Math.random() * 3);
  const ranSecond:number = Math.floor(Math.random() * 3);
  return {
    one:first[ranFirst],
    two:second[ranSecond]
  }
}