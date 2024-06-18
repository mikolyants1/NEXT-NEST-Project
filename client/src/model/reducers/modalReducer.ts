import { EModal } from "@/libs/enums/enum";
import { IModalAction, IModalState } from "@/libs/types";

export const modalState:IModalState = {
  type:EModal.CHANGE_COMMENT,
  data:{}
}

export function modalReducer(_:IModalState,action:IModalAction):IModalState{
   return {
      type:action.type,
      data:action.payload
   }
}