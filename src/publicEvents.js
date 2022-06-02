import React from 'react';
import Event from './event.js';
import { db } from './firebase.js';
import { useState } from 'react';
import { useEffect } from 'react';
import './publicEvents.css'


function PublicEvents({userID, dateID, date}) {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').where("public", "==", true).onSnapshot(snapshot => {
          setEvents(snapshot.docs.map(doc => ({
            id: doc.id,
            event: doc.data()
          })));
          //console.log("yay");
          //console.log(events);
        })
      });


  return (
    <div className='dayEvents'>
        <p>{date}</p>
        {
        events.map(({id, event}) => (
          <Event key={id} userID={userID} dateID={dateID} eventID={id} name={event.name} date={date} time={event.time} description={event.description}/>
        ))
        }
    </div>
  )
}

export default PublicEvents;