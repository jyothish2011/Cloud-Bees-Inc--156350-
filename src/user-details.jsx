import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from './service/user-service';

export default function DetailView() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await getUserDetails(id);
        console.log(details,"details")
        setUserDetails(details);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <img
        src={userDetails.avatar_url}
        alt="Avatar"
        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
      />
      <h1>{userDetails.name}</h1>
      <p>Location: {userDetails.location}</p>
      <p>Company: {userDetails.company || 'Not specified'}</p>
      <p>Followers: {userDetails.followers}</p>
      <p>Following: {userDetails.following}</p>
      <p>Public Repositories: {userDetails.public_repos}</p>
    </div>
  );
}
