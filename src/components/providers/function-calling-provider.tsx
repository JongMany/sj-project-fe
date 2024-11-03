"use client";
import {createContext, PropsWithChildren, useContext, useState} from "react";

interface FunctionCallingContextType {
  data: {
    [threadId: string]: boolean;
  }
  changeIsNewFunctionCalling: (threadId: string, isNewFunctionCalling: boolean) => void;
}

const FunctionCallingContext = createContext<FunctionCallingContextType>({
  data: {},
  changeIsNewFunctionCalling: () => {
  },
});

const MONGLE_LS_KEY = 'MONGLE_FUNCTION_CALLING'

const FunctionCallingProvider = ({children}: PropsWithChildren) => {
  const [data, setData] = useState<{
    [threadId: string]: boolean;
  }>(() => {
    if (typeof window === 'undefined') return {};
    const localString = localStorage.getItem(MONGLE_LS_KEY);
    return localString ? JSON.parse(localString) : {};
  });

  const changeIsNewFunctionCalling = (threadId: string, isNewFunctionCalling: boolean) => {
    const newData = {
      ...data,
      [threadId]: isNewFunctionCalling
    }
    setData(newData);
    localStorage.setItem(MONGLE_LS_KEY, JSON.stringify(newData));
  }

  return <FunctionCallingContext.Provider value={{data, changeIsNewFunctionCalling}}>
    {children}
  </FunctionCallingContext.Provider>
}

export const useFunctionCallingContext = () => {
  const context = useContext(FunctionCallingContext);
  if (!context) {
    throw new Error("FunctionCallingContext is not defined");
  }
  return context;
}

export default FunctionCallingProvider