import React from 'react';
import './home.css'
import { db } from './firebase.js';
import { useState } from 'react';
import { useEffect } from 'react';
import UserEvents from './userEvents.js';


function Home() {
  const [userEventss, setUserEventss] = useState([]);
  useEffect(() => {
    db.collection('users').onSnapshot(snapshot => {
      setUserEventss(snapshot.docs.map(doc => ({
        id: doc.id,
        userEvent: doc.data()
      })));
    })
  }, []);
  

  return (
    <div className='home'>
      {
        userEventss.map(({id, userEvent}) => (
          <UserEvents key={id} userID={id} name={userEvent.user} />
        ))
      }
    </div>
  )
}

export default Home;