/// App.jsx
import { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StatCard from './components/Statcard';
import RoutePlanner from './components/RoutePlanner';
import MapBox from './components/Mapbox';
import EvStationList from './components/EvStationList';
import AddNewStation from './components/AddNewStation';

const getCoordinates = async (place) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
  );
  const data = await response.json();
  if (data.length === 0) return null;
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  };
};

const Home = () => {
  const [walletBalance, setWalletBalance] = useState(150);
  const [chargingSessions] = useState(23);
  const [activeBooking] = useState("Today 3:00 PM");

  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [coordinates, setCoordinates] = useState({ start: null, end: null });
  const [evStations, setEvStations] = useState([]);

  const handleTopUp = () => setWalletBalance(prev => prev + 50);

  const handlePlanRoute = async () => {
    if (!startLocation || !destination) {
      alert("Please enter both start and destination.");
      return;
    }

    const startCoords = await getCoordinates(startLocation);
    const endCoords = await getCoordinates(destination);

    if (startCoords && endCoords) {
      setCoordinates({
        start: [startCoords.lat, startCoords.lon],
        end: [endCoords.lat, endCoords.lon]
      });

      const res = await fetch(`http://localhost:3000/evstations?location=${destination}`);
      const data = await res.json();
      setEvStations(data);
    } else {
      alert("Could not find one or both locations.");
    }
  };

  return (
    <main className="dashboard">
      <div className="cards">
        <StatCard
          title="Wallet Balance"
          value={`$${walletBalance}`}
          subtext={<button onClick={handleTopUp}>Top Up +$50</button>}
        />
        <StatCard
          title="Charging Sessions"
          value={chargingSessions}
          subtext="This month"
        />
        <StatCard
          title="Active Bookings"
          value="2"
          tag={`Next: ${activeBooking}`}
        />
        <StatCard
          title="Member Since"
          value="2024"
          subtext="Professional Member"
        />
      </div>
      <div className="route-map">
        <RoutePlanner
          startLocation={startLocation}
          destination={destination}
          setStartLocation={setStartLocation}
          setDestination={setDestination}
          onPlanRoute={handlePlanRoute}
        />
        <MapBox coordinates={coordinates} />
        <EvStationList stations={evStations} />
      </div>
    </main>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addnewstation" element={<AddNewStation />} />
      </Routes>
    </Router>
  );
};

export default App;