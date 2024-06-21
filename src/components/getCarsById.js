import React, { useState } from 'react';

function GetCarById() {
  const [carId, setCarId] = useState('');
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = (event) => {
    setCarId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    if (showDetails) {
      setShowDetails(false); 
      setCar(null);
      setCarId('');
    } else {
      fetch(`https://apicars.prisms.in/car/get/${carId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error === 0) {
            setCar(data.Car);
            setShowDetails(true); 
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
    }
  };

  return (
    <div style={{ textAlign: "left", marginLeft: "50px" }}>
      <form onSubmit={handleSubmit}>
        <label style={{ marginRight: "20px", marginLeft: "2px" }}>
          Search by Car ID:
          <input style={{ marginLeft: "5px" }} type="number" value={carId} onChange={handleChange} required />
        </label>
        <button style={{ backgroundColor: "lightblue", borderRadius: "10px" }} type="submit">
          {showDetails ? 'Hide Car' : 'Get Car'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {car && showDetails && (
        <div>
          <h3>Car Details</h3>
          <p><strong>ID:</strong> {car.id}</p>
          <p><strong>Model:</strong> {car.model}</p>
          <p><strong>Purchase Date:</strong> {car['purchase_date']}</p>
          <h4>Servicing Records</h4>
          <ul>
            {car.Servicing.map((service) => (
              <li key={service.Id}>
                <strong>Servicing Date:</strong> {service['servicing_date']}<br />
                <strong>Status:</strong> {service.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetCarById;
