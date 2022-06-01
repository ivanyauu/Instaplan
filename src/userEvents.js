import React from 'react';
import './userEvents.css';
import { db } from './firebase.js';
import { useState, useEffect} from 'react';
import DatesEvents from './datesEvents';


function UserEvents({userID, name}) {
    const [dateEvents, setDateEvents] = useState([]);
    // let today = new Date();
    // let yyyy = today.getFullYear();
    // let mm = today.getMonth() + 1; // Months start at 0!
    // let dd = today.getDate();

    // // if (dd < 10) dd = '0' + dd;
    // // if (mm < 10) mm = '0' + mm;
    // // Depends on if we want our date to be 5/5/2022 or 05/05/2022

    // today = mm + '/' + dd + '/' + yyyy;
    // This really depends on how we implement our dates

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
          <DatesEvents key={id} userID={userID} dateID={id} date={datesEvent.date} profileBool={false} />
        ))
      }
    </div>
  )
}

export default UserEvents;