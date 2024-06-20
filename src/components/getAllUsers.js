import React, { useState } from 'react';

function GetAllUsers() {
  const [data, setData] = useState({ Users: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    fetch('https://apicars.prisms.in/user/getall')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error === 0) {
          setData(data);
          console.log(data);
        } else {
          setError(data['error-message']);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching users:', error);
        setError(error.message);
      });
  };

  const handleShowUsers = () => {
    if (!showUsers) {
      fetchUsers();
    }
    setShowUsers(!showUsers);
  };

  return (
    <div style={{textAlign:"left", marginLeft:"50px"}}>
      <h3>Get Users</h3>
      <button onClick={handleShowUsers} style={{backgroundColor:"lightblue", borderRadius:"10px"}}>
        {showUsers ? 'Hide Users' : 'Show All Users'}
      </button>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {showUsers && (
        <ul>
          {data.Users?.map((user, i) => (
            <li key={i}>
              {user.name} - {user.phone_no}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetAllUsers;
