import React from 'react'
import { db } from './firebase.js'
import UserEvents from './userEvents.js';
import FriendProfile from './friendProfile.js';
import { useState } from 'react';
import { useEffect } from 'react';
import './homeEvents.css'

function HomeEvents({userID}) {
    const [userEventss, setUserEventss] = useState([]);
    const [followers, setFollowers] = useState([]);
    useEffect(() => {
      db.collection('users').onSnapshot(snapshot => {
        setUserEventss(snapshot.docs.map(doc => ({
          id: doc.id,
          userEvent: doc.data()
        })));
      })
    }, []);
    
    
  
    return (
      <div className='homeEvents'>
        {
          userEventss.map(({id, userEvent}) => (
            <div>
                <FriendProfile id={id} user={userEvent.user} />
                <UserEvents id={id} key={id} userID={id} name={userEvent.user} />
            </div>
          ))
        }
      </div>
    )
}

export default HomeEvents;