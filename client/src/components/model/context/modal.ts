
import {type IModalContext } from "@/components/libs/types/type";
import { createContext } from "react";

export const ModalContext = createContext<IModalContext>({} as IModalContext);