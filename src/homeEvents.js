import React from 'react'
import { db } from './firebase.js'
import { useState } from 'react';
import { useEffect } from 'react';
import './homeEvents.css'
import CurrentEvents from './currentEvents.js';

function HomeEvents({userID}) {   
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        db.collection('users').doc(userID).collection('following').onSnapshot(snapshot => {
            setFollowing(snapshot.docs.map(doc => ({
                id: doc.id,
                user: doc.data()
            })));
        })
    });
    
  
    return (
      <div className='homeEvents'>
        
        {
            following.map(({id, user}) => (
                <div className='followingEvents'>
                    <CurrentEvents id={id} key={id} userID={user.user} name={user.username} />
                </div>
            ))
        }
      </div>
    )
}

export default HomeEvents;