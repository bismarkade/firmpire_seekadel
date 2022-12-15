import React from 'react';
import { useSelector } from 'react-redux';

import { setUser, userSelector } from '../../features/auth';

const Profile = () => { 
  const { user } = useSelector(userSelector);

  return (
    <div>
    Profile name {user.username} and {user.id} 
    </div>
  );
};

export default Profile;