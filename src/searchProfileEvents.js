import React from 'react';
import './searchProfileEvents.css';
import { db } from './firebase.js';
import { useState, useEffect} from 'react';
import PublicEvents from './publicEvents';
import FriendProfile from './friendProfile';


function SearchProfileEvents({userID, name}) {
    const [dateEvents, setDateEvents] = useState([]);


    useEffect(() => {
        db.collection('users').doc(userID).collection('dates').onSnapshot(snapshot => {
          setDateEvents(snapshot.docs.map(doc => ({
            id: doc.id,
            datesEvent: doc.data()
          })));
        })
      });

  return (
    <div className='userEvents'>
      <div className='username'>
        <FriendProfile id = {userID} user ={name}/>
      </div>
      {
        dateEvents.map(({id, datesEvent}) => (
          <PublicEvents key={id} userID={userID} dateID={id} date={datesEvent.date} />
        ))
      }
    </div>
  )
}

export default SearchProfileEvents;