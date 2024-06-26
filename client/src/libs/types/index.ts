import { Dispatch, LazyExoticComponent, SetStateAction } from "react"
import { EFriendAction, EModal } from "../enums/enum"
import { UserApi } from "@/api/user/UserApi";
import { TaskApi } from "@/api/task/TaskApi";
import { InviteApi } from "@/api/invite/InviteApi";

export interface IComment {
  id:string,
  text:string,
  author:string,
  author_id:string,
  date:number,
  was_update:boolean
}

export type TLazy = LazyExoticComponent<() => JSX.Element>;

export type TApi = keyof UserApi | keyof TaskApi | keyof InviteApi;

export interface IFields {
  name:keyof TForm
}

export interface IFriend {
  id:string,
  friend_id:string,
}

export interface Invitation {
  id:string,
  addresser:string,
  recipient:string
}

export interface ICheckBody {
  username:string,
  password:string,
  isLogin:boolean    
}

export interface ICheckRes {
  id:string,
  token:string,
  success:boolean,
  tag:string,
  message:string
}

export interface ITask {
  id:string,
  title:string
}


export interface ITaskUpdateBody {
  title:string,
  taskId:string
}

export interface ICommBody {
  text:string,
  author:string,
  taskId:string
}

export interface ILogo {
  one:string,
  two:string
}
  

export interface ICommUpdateBody extends Omit<ICommBody,"author"|"taskId"> {
  id:string
}

export interface IUser {
  id:string,
  username:string,
  tag:string,
  raiting:number
}

export interface IUserBody extends Omit<ICheckBody,"isLogin">{
    tag:string
}

export interface IAccessBody {
  check_name:string,
  check_pass:string
}

export interface IFriendBody {
  friendId:string,
  action:EFriendAction
}

export interface IUpdateTaskOrCommState<T> {
  id:string,
  text:string,
  change:Dispatch<SetStateAction<T>>
}
export interface IUpdateUserState {
  id:string,
  username:string,
  tag:string
}

export interface IRemUserState {
  friendId:string
}

type TModalUnion = IUpdateTaskOrCommState<ITask[]|IComment[]>|IRemUserState|IUpdateUserState|{};

export interface IModalState {
  type:EModal,
  data:TModalUnion
}

export type Null<T> = T | null;

export interface IModalAction {
  type:EModal,
  payload:TModalUnion
}

export interface IModalContext {
  state:IModalState,
  dispatch:Dispatch<IModalAction>,
  isOpen:boolean,
  onOpen:()=>void,
  onClose:()=>void
}

export interface InviteCreareBody {
   recipient:string
}

export type TForm = Pick<IUser,"tag"|"username"> & {password:string};