import React, { useState } from 'react';

function GetUserById() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    if (showDetails) {
      setShowDetails(false); // Hide details if they are already shown
      setUser(null);
      setUserId('');
    } else {
      fetch(`https://apicars.prisms.in/user/get/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error === 0) {
            setUser(data.User);
            setShowDetails(true); // Show details when data is successfully fetched
          } else {
            setError(data['error-message']);
            setUser(null);
          }
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          setError('Error fetching user. Please try again.');
          setUser(null);
        });
    }
  };

  return (
    <div style={{ textAlign: "left", marginLeft: "50px" }}>
      <h2>Get User by ID</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter User ID:
          <input type="number" value={userId} onChange={handleChange} required />
        </label>
        <button type="submit" style={{ backgroundColor: "lightblue", borderRadius: "10px", marginLeft:"25px" }}>
          {showDetails ? 'Hide User' : 'Get User'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && showDetails && (
        <div>
          <h3>User Details</h3>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone Number:</strong> {user['phone_no']}</p>
          {user.Cars && user.Cars.length > 0 && (
            <div>
              <h4>Cars</h4>
              <ul>
                {user.Cars.map((car) => (
                  <li key={car.Id}>
                    <p><strong>Car ID:</strong> {car.id}</p>
                    <p><strong>Model:</strong> {car.model}</p>
                    <p><strong>Color:</strong> {car.color}</p>
                    <p><strong>Purchase Date:</strong> {car['purchase_date']}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GetUserById;
