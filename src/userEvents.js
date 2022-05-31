import React from 'react';
import './userEvents.css';
import { db } from './firebase.js';
import { useState, useEffect} from 'react';
import DatesEvents from './datesEvents';


function UserEvents({userID, name}) {
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
      {/* <div className='username'>
        <p><strong><i>{name}</i></strong></p>
      </div> */}
      {
        dateEvents.map(({id, datesEvent}) => (
          <DatesEvents key={id} userID={userID} dateID={id} date={datesEvent.date} />
        ))
      }
    </div>
  )
}

export default UserEvents;