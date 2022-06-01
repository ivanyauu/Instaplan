import React from 'react';
import './event.css';
import { Card } from '@mui/material';
import Comments from './comments';


function Event({userID, dateID, eventID, name, date, time, description}) {

  return (
    <Card className='event'>
      <div className='eventHeader'>
          <p><strong><i>{name}</i></strong> @ {time}</p>  
      </div>
      <div className='eventDesc'>
        <p>{description}</p>  
      </div>
      <Comments userID={userID} dateID={dateID} eventID={eventID}></Comments> 
    </Card>
  )
}


export default Event;