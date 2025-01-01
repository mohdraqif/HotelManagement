import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import UserBookings from './screens/Userbookings';
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/bookings" element={<UserBookings />} />
          <Route
            path="/book/:roomid/:startDate/:endDate"
            element={<Bookingscreen />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
