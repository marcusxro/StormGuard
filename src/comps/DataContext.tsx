import React, { createContext, useState, ReactNode } from 'react'

import { WeatherDataType } from './DataTypeInterface';


export{}

interface DataContextType {
  data: WeatherDataType | null; 
  setWeatherData: (data: WeatherDataType) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setWeatherData] = useState<WeatherDataType | null>(null); 
  return (
    <DataContext.Provider value={{ data, setWeatherData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
