// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function GetUserById() {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     fetch(`http://localhost:5000/users/get/${id}`)
//       .then(async(res) => {
//         setLoading(false);
//         if (!res.ok) {
//           const errorData = await res.json();
//           throw new Error(errorData['error-message'] || 'Unexpected error');
//         }
//         if (res.headers.get('content-type').includes('application/json')) {
//           return res.json();
//         } else {
//           throw new Error('Unexpected content type');
//         }
//       })
//       .then((data) => {
//         setLoading(false);
//         if (data.error === 0) {
//           setUser(data.user);
//         } else {
//           setError(data['error-message']);
//         }
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.error('Error fetching user:', error);
//         setError(error.message);
//       });
//   }, [id]);

//   return (
//     <div>
//       <h3>User Details</h3>
//       {loading && <div>Loading...</div>}
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {user && (
//         <div>
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Phone Number:</strong> {user.phone}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GetUserById;

import React, { useState } from 'react';

function GetUserById() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    fetch(`http://localhost:5000/users/get/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Response data:', data); // Log the response data

        if (data.error === 0) {
          setUser(data.user);
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
  };

  return (
    <div style={{textAlign:"left", marginLeft:"50px"}}>
      <form onSubmit={handleSubmit}>
        <label style={{marginRight:"20px", marginLeft:"2px"}}>
          Search by ID : 
          <input style={{marginLeft:"5px"}} type="number" value={userId} onChange={handleChange} required />
        </label>
        <button style={{backgroundColor:"lightblue", borderRadius:"10px"}} type="submit">Get User</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && (
        <div>
          <h3>User Details</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone Number:</strong> {user.phone}</p>
        </div>
        
      )}
    </div>
  );
}

export default GetUserById;
