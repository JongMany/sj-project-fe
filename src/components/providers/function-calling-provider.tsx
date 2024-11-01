"use client";
import {createContext, PropsWithChildren, useContext, useState} from "react";

interface FunctionCallingContextType {
  isNewFunctionCalling: boolean;
  changeIsNewFunctionCalling: (isNewFunctionCalling: boolean) => void;
}

const FunctionCallingContext = createContext<FunctionCallingContextType>({
  isNewFunctionCalling: false,
  changeIsNewFunctionCalling: () => {},
});

const MONGLE_LS_KEY = 'MONGLE_FUNCTION_CALLING'

const FunctionCallingProvider = ({children}: PropsWithChildren) => {
  const [isNewFunctionCalling,setIsNewFunctionCalling] = useState<boolean>(() => {
    const localString = localStorage.getItem(MONGLE_LS_KEY);
    return localString ? JSON.parse(localString) : false;
  });
  const changeIsNewFunctionCalling = (isNewFunctionCalling: boolean) => {
    setIsNewFunctionCalling(isNewFunctionCalling);
    localStorage.setItem(MONGLE_LS_KEY, JSON.stringify(isNewFunctionCalling));
  }


  return <FunctionCallingContext.Provider value={{isNewFunctionCalling, changeIsNewFunctionCalling}}>
    {children}
  </FunctionCallingContext.Provider>
}

export const useFunctionCallingContext = () => {
  const context = useContext(FunctionCallingContext);
  if(!context) return;
  return context;
}

export default FunctionCallingProvider