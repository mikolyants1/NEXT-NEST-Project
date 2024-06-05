
interface IProps {
  length:number
}

function InviteCount({length}:IProps):JSX.Element {
 const size = length ? length >= 10 ? "23px" : "20px" : "20px";
 const pt = length >= 10 ? 0.5 : 0;
 const count = `${length > 10 ? "10+" : length}`;
 const bg = length ? "red" : "black";

  return (
    <div className='rounded-[50%] text-white text-center text-sm'
     style={{
      width:size,
      height:size,
      paddingTop:pt,
      backgroundColor:bg
     }}>
      {count}
   </div>
  )
}

export default InviteCount