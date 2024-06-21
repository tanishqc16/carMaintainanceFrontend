// import React, { useState, useEffect } from 'react';

// function GetAllUserCars({ userid }) {
//   const [cars, setCars] = useState([]);
//   const [error, setError] = useState(null);
//   const [showDetails, setShowDetails] = useState(false); // State to toggle details visibility

//   useEffect(() => {
//     fetch(`https://apicars.prisms.in/car/getall?userid=${userid}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.error === 0) {
//           setCars(data.Cars);
//           console.log(data.Cars);
//         } else {
//           setError(data['error-message']);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching user cars:', error);
//         setError('Error fetching user cars. Please try again.');
//       });
//   }, [userid]);

//   const toggleDetails = () => {
//     setShowDetails(!showDetails);
//   };

//   return (
//     <div style={{textAlign:"left", marginLeft:"50px"}}>
//       <h2>Cars for User {userid}</h2>
//       <button style={{backgroundColor:"lightblue", borderRadius:"10px"}} onClick={toggleDetails}>
//         {showDetails ? 'Hide Details' : 'Show Details'}
//       </button>
//       {showDetails && (
//         <div>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <ul>
//             {cars.map((car) => (
//               <li key={car.Id}>
//                 <strong>Model:</strong> {car.Model}, <strong>Color:</strong> {car.Color}, <strong>Purchase Date:</strong> {car['Purchase-date']}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GetAllUserCars;
import React, { useState } from 'react';

function GetAllUserCars() {
  const [userId, setUserId] = useState('');
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleShowCars = () => {
    setError(null);

    fetch(`https://apicars.prisms.in/car/getall?userid=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) {
          setCars(data.Cars);
        } else {
          setError(data['error-message']);
          setCars([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching car records:', error);
        setError('Error fetching car records. Please try again.');
        setCars([]);
      });
  };

  return (
    <div style={{textAlign:"left", marginLeft:"50px"}}>
      <h2>Get All Car Records for a User</h2>
      <label>
        Enter User ID:
        <input type="number" value={userId} onChange={handleChange} required />
      </label>
      <button style={{backgroundColor:"lightblue", borderRadius:"10px", marginLeft:"25px"}} onClick={handleShowCars}>Show Cars</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cars.length > 0 && (
        <div>
          <h3>Car Records</h3>
          <ul>
            {cars.map((car) => (
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
  );
}

export default GetAllUserCars;
