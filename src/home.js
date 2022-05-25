import React from 'react';
import Event from './event.js';
import './home.css'


function home() {
  return (
    <div className='home'>
      <div className='poster'>
        <strong><i>Michael Tao</i></strong>
      </div>
      <div className='userEvents'>
      <Event name='Project Due' date='6/1/2022' time='5:00am' description='Turn in 35L project'/>
      <Event name='Physical Therapy' date='5/24/2022' time='4:00pm' description='Go to trainer for PT'/>
      </div>
    </div>
  )
}

export default home;