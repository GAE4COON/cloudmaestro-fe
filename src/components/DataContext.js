import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 새로운 state 추가

  const contextValue = {
    data,
    setData,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);