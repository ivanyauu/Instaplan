import React from 'react';
import './userEvents.css';
import { db } from './firebase.js';
import { useState, useEffect} from 'react';
import DatesEvents from './datesEvents';


function CurrentEvents({userID, name}) {
    const [dateEvents, setDateEvents] = useState([]);

    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = dd;
    if (mm < 10) mm = mm;

    today = mm + '/' + dd + '/' + yyyy;
    
    useEffect(() => {
        db.collection('users').doc(userID).collection('dates').where('date', '==', today).onSnapshot(snapshot => {
          setDateEvents(snapshot.docs.map(doc => ({
            id: doc.id,
            datesEvent: doc.data()
          })));
        })
      });

  return (
    <div className='userEvents'>
      <div className='username'>
        <p><strong><i>{name}</i></strong></p>
      </div>
      {
        dateEvents.map(({id, datesEvent}) => (
          <DatesEvents key={id} userID={userID} dateID={id} date={datesEvent.date} />
        ))
      }
    </div>
  )
}

export default CurrentEvents;