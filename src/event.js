import React from 'react';

function Event(name, date, time, description) {
  return (
        <div>
            <p>{name} {date} {time}</p>
            <p>{description}</p>
        </div>
  )
}





export default Event;