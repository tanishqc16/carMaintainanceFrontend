import React, { useState } from 'react';

function GetAllServicingCar() {
  const [servicings, setServicings] = useState([]);
  const [error, setError] = useState(null);

  const handleGetAllRecords = () => {
    setError(null);

    fetch('http://localhost:5000/servicing/getall')
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) {
          setServicings(data.servicings);
        } else {
          setError(data['error-message']);
          setServicings([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching servicing records:', error);
        setError('Error fetching servicing records. Please try again.');
        setServicings([]);
      });
  };

  return (
    <div style={{textAlign:"left", marginLeft:"50px"}}>
      <h2>Get All Servicing Records</h2>
      <button style={{backgroundColor:"lightblue", borderRadius:"10px"}}  onClick={handleGetAllRecords}>Get All Servicing Records</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {servicings.length > 0 && (
        <div>
          <h3>Servicing Records</h3>
          <ul>
            {servicings.map((service) => (
              <li key={service.Id}>
                <p><strong>Car ID:</strong> {service.carid}</p>
                <p><strong>Service ID:</strong> {service.Id}</p>
                <p><strong>Servicing Date:</strong> {service['servicing-date']}</p>
                <p><strong>Status:</strong> {service.Status}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetAllServicingCar;
