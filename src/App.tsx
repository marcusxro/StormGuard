import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Header from './comps/Header';
import { DataProvider } from './comps/DataContext';
import LiveTracker from './pages/LiveTracker';
import { DataProviders } from './comps/AlertContext';

const App: React.FC = () => {

  return (
    <Router>
      <DataProvider>
        <DataProviders>
          <div className="App">
            <Header />
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/live-tracker' element={<LiveTracker />} />
            </Routes>
          </div>
        </DataProviders>
      </DataProvider>
    </Router>
  );
}

export default App;
