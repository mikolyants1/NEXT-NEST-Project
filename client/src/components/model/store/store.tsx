import {type IStore } from '@/components/libs/types/type';
import {create} from 'zustand'
import {persist,devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer'

export const useStore = create<IStore>()(
persist(devtools(immer((set)=>({
  name:"",
  id:"",
  token:"",
  tag:"",
  setId:(id:string)=>set((state:IStore):void=>{
     state.id = id;
  }),
  setName:(name:string):void=>{
    set({name});
  },
  setToken:(token:string):void=>{
    set({token});
  },
  setTag:(tag:string):void=>{
    set({tag});
  }
}))),{version:1,name:'films'}))