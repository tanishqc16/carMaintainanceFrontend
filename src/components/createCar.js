// import React, { useState } from 'react';

// function CreateCarRecord() {
//   const [model, setModel] = useState('');
//   const [color, setColor] = useState('');
//   const [ownerId, setOwnerId] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');
//   const [error, setError] = useState(null);

//   const handleChangeModel = (event) => {
//     setModel(event.target.value);
//   };

//   const handleChangeColor = (event) => {
//     setColor(event.target.value);
//   };

//   const handleChangeOwnerId = (event) => {
//     setOwnerId(event.target.value);
//   };

//   const handleChangePurchaseDate = (event) => {
//     setPurchaseDate(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setError(null);

//     const data = {
//       model,
//       color,
//       ownerid: ownerId,
//       purchase_date: purchaseDate
//     };

//     fetch('http://localhost:5000/car/create', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.error === 0) {
//         // Car record created successfully
//         console.log('Car record created:', data.car);
//       } else {
//         // Error creating car record
//         setError(data['error-message']);
//       }
//     })
//     .catch((error) => {
//       console.error('Error creating car record:', error);
//       setError('Error creating car record. Please try again.');
//     });
//   };

//   return (
//     <div style={{textAlign:"left", marginLeft:"50px"}}>
//       <h2>Create Car Record For a User</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Model:
//           <input style={{marginLeft:"5px"}} type="text" value={model} onChange={handleChangeModel} required />
//         </label>
//         <br />
//         <label>
//           Color:
//           <input style={{marginLeft:"5px"}} type="text" value={color} onChange={handleChangeColor} required />
//         </label>
//         <br />
//         <label>
//           Owner ID (User ID):
//           <input style={{marginLeft:"5px"}} type="number" value={ownerId} onChange={handleChangeOwnerId} required />
//         </label>
//         <br />
//         <label>
//           Purchase Date:
//           <input style={{marginLeft:"5px"}} type="date" value={purchaseDate} onChange={handleChangePurchaseDate} required />
//         </label>
//         <br />
//         <button style={{backgroundColor:"lightblue", borderRadius:"10px"}} type="submit">Create Car Record</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }

// export default CreateCarRecord;
import React, { useState } from 'react';

function CreateCarRecord() {
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(null);

    const carData = {
      model,
      color,
      ownerid: ownerId,
      purchase_date: purchaseDate,
    };

    fetch('https://apicars.prisms.in/car/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) {
          setMessage('Car created successfully!');
        } else {
          setMessage(`Error: ${data['error-message']}`);
        }
      })
      .catch((error) => {
        console.error('Error creating car:', error);
        setMessage('Error creating car. Please try again.');
      });
  };

  return (
    <div style={{textAlign:"left", marginLeft:"50px"}}>
      <h2>Create New Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label style={{marginRight:"5px"}}>
          Model:
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </label>
        </div>
        <div>
        <label style={{marginRight:"5px"}}>
          Color:
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </label>
        </div>
        <div>
        <label style={{marginRight:"5px"}}>
          Owner ID:
          <input
            type="number"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            required
          />
        </label >
        </div>
        {/* <br /> */}
        <div>
        <label style={{marginRight:"5px"}}>
          Purchase Date:
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            required
          />
        </label>
        </div>
        <br />
        <button style={{backgroundColor:"lightblue", borderRadius:"10px"}} type="submit">Create Car</button>
      </form>
      {message && <p style={{color:"red"}}>{message}</p>}
    </div>
  );
}

export default CreateCarRecord;
