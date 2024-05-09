type TSize = "xl"|"xs";

interface IStyle {
  p:Record<TSize,string>,
  h:Record<TSize,string>,
  w:Record<TSize,string>,
  fs:Record<TSize,string>,
  getSize:(key:keyof IStyle,s:TSize) => string
}

export const styles:IStyle = {
  p:{
    xl:"13px",
    xs:"8px"
  },
  h:{
    xl:"80px",
    xs:"48px"
  },
  w:{
    xl:"80px",
    xs:"48px"
  },
  fs:{
    xl:"37px",
    xs:"21px"
  },
  getSize(key:keyof IStyle,s:TSize){
    return this[key][s];
  }
}