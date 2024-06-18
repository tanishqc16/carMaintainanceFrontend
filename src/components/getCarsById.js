import React, { useState } from 'react';

function GetCarById() {
  const [carId, setCarId] = useState('');
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setCarId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    fetch(`http://localhost:5000/cars/get/${carId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) {
          setCar(data.Car);
        } else {
          setError(data['error-message']);
          setCar(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching car:', error);
        setError('Error fetching car. Please try again.');
        setCar(null);
      });
  };

  return (
    <div style={{textAlign:"left", marginLeft:"50px"}}>
      <form onSubmit={handleSubmit}>
        <label style={{marginRight:"20px", marginLeft:"2px"}}>
          Search by ID:
          <input style={{marginLeft:"5px"}} type="number" value={carId} onChange={handleChange} required />
        </label>
        <button style={{backgroundColor:"lightblue", borderRadius:"10px"}} type="submit">Get Car</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {car && (
        <div>
          <h3>Car Details</h3>
          <p><strong>ID:</strong> {car.id}</p>
          <p><strong>Model:</strong> {car.model}</p>
          <p><strong>Purchase Date:</strong> {car['purchase-date']}</p>
          <h4>Servicing Records</h4>
          <ul>
            {car.Servicing.map((service) => (
              <li key={service.Id}>
                <strong>Servicing Date:</strong> {service['servicing-date']}<br />
                <strong>Status:</strong> {service.Status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetCarById;
