import { useState } from 'react'
import CheckStepCard from './steps/CheckStepCard';
import UpdateStepCard from './steps/UpdateStepCard';

function UpdateUserCard():JSX.Element {
  const [step,setStep] = useState<boolean>(false);
  
  return (
    <div className="w-[100%] justify-center items-center flex gap-4 flex-col">
      {!step && (
        <CheckStepCard
         next={() => setStep(true)}
         />
      )}
      {step && <UpdateStepCard />}
    </div>
  )
}

export default UpdateUserCard