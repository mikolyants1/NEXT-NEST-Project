import { EModal } from "@/components/libs/enums/enum";
import { IModalAction, IModalState } from "@/components/libs/types/type";

export const modalState:IModalState = {
  type:EModal.NOTIFIC_WARN,
  data:null
}

export function modalReducer(state:IModalState,action:IModalAction):IModalState{
   return {
      type:action.type,
      data:action.payload
   }
}