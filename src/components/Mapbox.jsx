import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const MapBox = ({ coordinates }) => {
  if (!coordinates.start || !coordinates.end) {
    return (
      <div className="map">
        <h4>Interactive Map View</h4>
        <p>Enter route to show on map.</p>
        <div className="map-box" style={{ height: '350px', width: '90%', borderRadius: '10px', backgroundColor: '#283d63' }}></div>
      </div>
    );
  }

  return (
    <div className="map">
      <h4>Map View</h4>
      <MapContainer
        center={coordinates.start}
        zoom={10}
        style={{ height: '350px', width: '100%', borderRadius: '10px' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coordinates.start} />
        <Marker position={coordinates.end} />
        <Polyline positions={[coordinates.start, coordinates.end]} color="blue" />
      </MapContainer>
    </div>
  );
};

export default MapBox;