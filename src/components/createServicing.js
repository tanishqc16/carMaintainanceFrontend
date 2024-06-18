import React, { useState } from 'react';

function CreateServicingRecord() {
  const [carid, setCarid] = useState('');
  const [servicingDate, setServicingDate] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const requestData = {
      carid: parseInt(carid, 10),
      servicing_date: servicingDate,
      status: status,
    };

    fetch('http://localhost:5000/servicing/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) {
          setSuccess('Servicing record created successfully!');
        } else {
          setError(data['error-message']);
        }
      })
      .catch((error) => {
        console.error('Error creating servicing record:', error);
        setError('Error creating servicing record. Please try again.');
      });
  };

  return (
    <div style={{textAlign:"left", marginLeft:"50px"}}>
      <h2>Create Servicing Record</h2>
      <form onSubmit={handleSubmit}>
        <label style={{marginRight:"5px"}}>
          Car ID:
          <input
            type="number"
            value={carid}
            onChange={(e) => setCarid(e.target.value)}
            required
          />
        </label>
        <br />
        <label style={{marginRight:"5px"}}>
          Servicing Date:
          <input
            type="date"
            value={servicingDate}
            onChange={(e) => setServicingDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label style={{marginRight:"5px"}}>
          Status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </label>
        <br />
        <button style={{backgroundColor:"lightblue", borderRadius:"10px"}} type="submit">Create Servicing Record</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default CreateServicingRecord;
