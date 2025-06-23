import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNewStation = () => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    location: '',
    type: '',
    availability: 'Available'
  });
  const [stations, setStations] = useState([]);
  const navigate = useNavigate();

  const fetchStations = async () => {
    const res = await fetch('http://localhost:3000/evstations');
    const data = await res.json();
    setStations(data);
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id
      ? `http://localhost:3000/evstations/${form.id}`
      : 'http://localhost:3000/evstations';

    const bodyData = { ...form };
    if (!form.id) delete bodyData.id; // don't send undefined ID on new POST

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });

    if (res.ok) {
      alert(`Station ${form.id ? 'updated' : 'added'}!`);
      setForm({ id: '', name: '', location: '', type: '', availability: 'Available' });
      fetchStations();
    } else {
      alert('Error saving station');
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/evstations/${id}`, { method: 'DELETE' });
    fetchStations();
  };

  const handleEdit = (station) => {
    setForm({ ...station });
  };

  return (
    <div className="card">
      <h2>Add / Edit EV Station</h2>
      <form onSubmit={handleSubmit} className="form-station">
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="Fast Charger">Fast Charger</option>
            <option value="Slow Charger">Slow Charger</option>
          </select>
        </div>
        <div className="form-group">
          <label>Availability</label>
          <select name="availability" value={form.availability} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit">{form.id ? 'Update Station' : 'Add Station'}</button>
        </div>
      </form>

      <h3 style={{ marginTop: '2rem' }}>All Charging Stations</h3>
      <ul className="station-list">
        {stations.map((station) => (
          <li key={station.id} className="station-item">
            <div>
              <strong>{station.name}</strong> - {station.location} - {station.type} - {station.availability}
            </div>
            <div className="station-actions">
              <button onClick={() => handleEdit(station)}>Edit</button>
              <button onClick={() => handleDelete(station.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddNewStation;