import React, { useState, useEffect } from 'react';

function GetAllUserCars({ userId }) {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // State to toggle details visibility

  useEffect(() => {
    fetch(`http://localhost:5000/cars/getall?userid=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) {
          setCars(data.Cars);
        } else {
          setError(data['error-message']);
        }
      })
      .catch((error) => {
        console.error('Error fetching user cars:', error);
        setError('Error fetching user cars. Please try again.');
      });
  }, [userId]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={{textAlign:"left", marginLeft:"50px"}}>
      <h2>Cars for User {userId}</h2>
      <button style={{backgroundColor:"lightblue", borderRadius:"10px"}} onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul>
            {cars.map((car) => (
              <li key={car.Id}>
                <strong>Model:</strong> {car.Model}, <strong>Color:</strong> {car.Color}, <strong>Purchase Date:</strong> {car['Purchase-date']}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetAllUserCars;
