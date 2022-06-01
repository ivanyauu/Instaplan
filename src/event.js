import React from 'react';
import './event.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { db, auth } from './firebase';
import firebase from "firebase/compat/app";
import { display } from '@mui/system';
import { Card } from '@mui/material';
import Comments from './comments';


function Event({userID, dateID, eventID, name, date, startTime, endTime, description, publicEvent, profileBool}) {

  function displayPublic () {
    if (profileBool && publicEvent) {
      return (<p>This event is public</p>)
    }
  }

  return (
    <Card className='event' style={{backgroundColor: "#f5f5f5"}}>
      <div className='eventHeader'>
          <p><strong><i>{name}</i></strong> {startTime} to {endTime}</p>  
      </div>

      <div className='eventDesc'>
        <p>Description: {description}</p>  
      </div>

      <div className='public'>
        {displayPublic()}
      </div>

      <Comments userID={userID} dateID={dateID} eventID={eventID}></Comments> 
    </Card>
  )
}


export default Event;