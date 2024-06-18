import React, { useState } from 'react';

function GetAllUsers() {
  const [data, setData] = useState({ users: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/users/getall')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error === 0) {
          setData(data);
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
          {data.users?.map((user, i) => (
            <li key={i}>
              {user.name} - {user.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetAllUsers;
