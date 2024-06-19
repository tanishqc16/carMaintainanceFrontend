import React, {useState} from 'react';
import GetAllUsers from './components/getAllUsers';
import CreateUser from './components/createUser';
import GetUserById from './components/getUserById';


function User() {
  const [updateUsers, setUpdateUsers] = useState(false);

  const handleUserCreated = () => {
    setUpdateUsers(!updateUsers);
  };
  return (
    <div>
        {/* <Navbar/> */}
        <CreateUser onUserCreated={handleUserCreated} />
        <br />
        <hr />
        <GetAllUsers updateUsers={updateUsers} />
        <br />
        <GetUserById/>
        
      </div>
  )
}

export default User
