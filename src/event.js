import React from 'react';
import './event.css';

function Event({name, date, time, description}) {
  return (
    <div className='event'>
      <div className='eventHeader'>
          <p><strong>{name}</strong> — {date} @ {time}</p>  
      </div>
      <div className='eventDesc'>
        <p>{description}</p>  
      </div>
    </div>
  )
}

export default Event;