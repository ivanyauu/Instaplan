import React from 'react';
import './home.css'
import { auth } from './firebase.js';
import HomeEvents from './homeEvents.js';


function Home({userID}) {

  let today = new Date();
  let yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = dd;
  if (mm < 10) mm = mm;

  today = mm + '/' + dd + '/' + yyyy;
  
  return (
    <div className='home'>
      <div className='header'>
        <h1 className='header1'>Welcome,</h1>
        <h2>Here are the events for {today}:</h2>
      </div>
      <HomeEvents userID={auth.currentUser.uid}/>
    </div>
  )
}

export default Home;