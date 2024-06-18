
import {type IModalContext } from "@/libs/types";
import { createContext } from "react";

export const ModalContext = createContext<IModalContext>({} as IModalContext);