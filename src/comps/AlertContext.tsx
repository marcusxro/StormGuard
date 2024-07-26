import React, { createContext, useState, ReactNode } from 'react'

export { }

interface Alert {
    description: string;
    effective_local: string;
    effective_utc: string;
    ends_local: string | null;
    ends_utc: string | null;
    expires_local: string | null;
    expires_utc: string | null;
    onset_local: string;
    onset_utc: string;
    regions: string[];
    severity: string;
    title: string;
    uri: string;
}

interface WeatherDataType {
    alerts: Alert[];
    city_name: string,
    country_code: string,
    lat: number,
    log: number,
    state_code: string | number,
    timezone: string
}
interface DataContextType {
    data: WeatherDataType | null;
    alerts: Alert[]; 
    setWeatherDataAlert: (data: WeatherDataType) => void;
    setAlerts: (alerts: Alert[]) => void; 
}

const DataContexts = createContext<DataContextType | undefined>(undefined);

export const DataProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setWeatherDataAlert] = useState<WeatherDataType | null>(null);
    const [alerts, setAlerts] = useState<Alert[]>([]);

    return (
        <DataContexts.Provider value={{ data, alerts, setWeatherDataAlert, setAlerts }}>
            {children}
        </DataContexts.Provider>
    );
};

export const useDataAlert = () => {
    const context = React.useContext(DataContexts);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
