import React, { useState } from 'react';

function CreateCarRecord() {
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [error, setError] = useState(null);

  const handleChangeModel = (event) => {
    setModel(event.target.value);
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleChangeOwnerId = (event) => {
    setOwnerId(event.target.value);
  };

  const handleChangePurchaseDate = (event) => {
    setPurchaseDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    const data = {
      model,
      color,
      ownerid: ownerId,
      purchase_date: purchaseDate
    };

    fetch('http://localhost:5000/car/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.error === 0) {
        // Car record created successfully
        console.log('Car record created:', data.car);
      } else {
        // Error creating car record
        setError(data['error-message']);
      }
    })
    .catch((error) => {
      console.error('Error creating car record:', error);
      setError('Error creating car record. Please try again.');
    });
  };

  return (
    <div style={{textAlign:"left", marginLeft:"50px"}}>
      <h2>Create Car Record For a User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Model:
          <input style={{marginLeft:"5px"}} type="text" value={model} onChange={handleChangeModel} required />
        </label>
        <br />
        <label>
          Color:
          <input style={{marginLeft:"5px"}} type="text" value={color} onChange={handleChangeColor} required />
        </label>
        <br />
        <label>
          Owner ID (User ID):
          <input style={{marginLeft:"5px"}} type="number" value={ownerId} onChange={handleChangeOwnerId} required />
        </label>
        <br />
        <label>
          Purchase Date:
          <input style={{marginLeft:"5px"}} type="date" value={purchaseDate} onChange={handleChangePurchaseDate} required />
        </label>
        <br />
        <button style={{backgroundColor:"lightblue", borderRadius:"10px"}} type="submit">Create Car Record</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreateCarRecord;
