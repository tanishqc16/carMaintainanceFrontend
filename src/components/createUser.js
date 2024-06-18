import React, { useState } from 'react';

function CreateUser({onUserCreated}) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage('');

    const userData = {
      name: name,
      phone_number: phoneNumber
    };

    fetch('http://localhost:5000/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.error === 0) {
        setSuccessMessage('User created successfully!');
        setName('');
        setPhoneNumber('');
        onUserCreated();
      } else {
        setError(data['error-message']);
      }
    })
    .catch((error) => {
      setError('Error creating user: ' + error.message);
    });
  };

  return (
    <div style={{textAlign:"left", marginLeft:"50px"}}>
      <h3>Create User</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{marginRight:"5px"}}>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{marginRight:"5px"}}>Phone Number: </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{backgroundColor:"lightblue", borderRadius:"10px"}}>Create User</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default CreateUser;
