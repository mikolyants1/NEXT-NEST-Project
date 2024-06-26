import {memo} from 'react';

interface IProps {
  error:string
}
function LoginErrorCard({error}:IProps):JSX.Element {
  return (
    <div>
     {!!error && (
       <div className="text-red-500 text-center mt-[10px]">
         {error}
       </div>
      )}
    </div>
  )
}

export default memo(LoginErrorCard)