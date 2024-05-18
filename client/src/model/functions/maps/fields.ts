import {type IFields } from "@/libs/types/type";

export const createFields = (isHome:boolean):IFields[] => {
   const data:IFields[] = [
      {name:'username'},
      {name:'password'}
    ];
    if (!isHome) data.push({name:"tag"});
    return data;
};