import React from 'react';

function Event({name, date, time, description}) {
  return (
    <div classname='event'>
        <div classname='eventHeader'>
            <p>{name} {date} {time}</p>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default Event;