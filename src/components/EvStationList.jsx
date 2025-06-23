const EvStationList = ({ stations }) => {
  if (stations.length === 0) return null;

  return (
    <div className="card ev-stations">
      <h3>Charging Stations near your destination</h3>
      <ul>
        {stations.map((station) => (
          <li key={station.id}>
            <strong>{station.name}</strong> — {station.type} —{" "}
            <span className={station.availability === "Available" ? "green" : "red"}>
              {station.availability}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvStationList;
