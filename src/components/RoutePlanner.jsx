const RoutePlanner = ({
  startLocation,
  destination,
  setStartLocation,
  setDestination,
  onPlanRoute,
}) => {
  return (
    <div className="route">
      <h3>Route Planning</h3>
      <label>Start Location</label>
      <input
        type="text"
        placeholder="Enter starting point"
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)}
      />
      <label>Destination</label>
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button className="route-btn" onClick={onPlanRoute}>
        Plan Route with Charging
      </button>
    </div>
  );
};

export default RoutePlanner;