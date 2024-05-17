
import {type IModalContext } from "@/libs/types/type";
import { createContext } from "react";

export const ModalContext = createContext<IModalContext>({} as IModalContext);