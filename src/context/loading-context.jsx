import React, { useContext, useState, createContext } from "react";


const LoadingContext = createContext([]);

export function LoadingProvider({children}) {
  const [loading, setLoading] = useState ({
    stillLoading: true,
    value: 0,
    endValue: 2000,
  });

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoadingContext = () => useContext(LoadingContext);