import React from 'react';
import './event.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { db, auth } from './firebase';
import firebase from "firebase/compat/app";
import { display } from '@mui/system';
import { Card } from '@mui/material';
import Comments from './comments';


function Event({userID, dateID, eventID, name, startTime, endTime, description, publicEvent, profileBool, date}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [datesList, updateDatesList]=useState([]);
  const [sharedEvents, updateSharedEvents]=useState([]);


  useEffect(() => {
    const interval = setInterval(() => {
        loadIntoDateList(auth.currentUser.uid);
        loadIntoSharedEvents(auth.currentUser.uid);
    }, 100);
  })

  function loadIntoDateList (passedUserID) {
    db.collection('users').doc(passedUserID).collection('dates').onSnapshot(snapshot => {
        updateDatesList(snapshot.docs.map(doc => ({
          id: doc.id,
          event: doc.data(),
        })));
    })
  }

  function loadIntoSharedEvents(passedUserID) {
    db.collection('users').doc(passedUserID).collection('sharedEvents').onSnapshot(snapshot => {
      updateSharedEvents(snapshot.docs.map(doc => ({
        id: doc.id,
        event: doc.data(),
      })));
  })
  }

  const postComment = (event) => {
    event.preventDefault();

    db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').doc(eventID).collection('comments').add({
        text: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: auth.currentUser.displayName,
    });

    setComment("");
    
    }
  useEffect(() => {
      db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').doc(eventID).collection('comments').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => ({
            id: doc.id,
            comment: doc.data()
          })));
      });


  }, []);

  function displayPublic () {
    if (profileBool && publicEvent) {
      return (<p>This event is public</p>)
    }
  }

  function deleteEventButton () {
    if (profileBool) {
      return (
        <button className="deleteEvent" onClick={() => deleteEvent()}>
          Delete This Event
        </button> 
      )
    }
  }
  
  function deleteEvent () {
    db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').doc(eventID).delete();
  }

  function addEventButton (){
    if (!profileBool) {
      return (
        <button className="deleteEvent" onClick={() => addEvent()}>
          {textInAddEventButton()}
        </button> 
      )

    }
  }

  async function addEvent() {
    if (!isSharedEvent()) {//don't do anythign if the event is already shared shared event
      findOrCreateDate(date);//this calls addToFirebase
    }
  }
  

  function isSharedEvent() {//finds date ID or creates date ID for given date
    for(let i = 0; i < sharedEvents.length; i++) {
      if (sharedEvents[i].event.eventID === eventID) {
        return true;
      }
    } 
    return false
  }

  async function findOrCreateDate(passedDate){
    if(getDateID(date)===false){
      await db.collection('users').doc(auth.currentUser.uid).collection('dates').add({
        date: date
      }).then((docRef) => {
        addToFirebase(docRef.id);
      });
    } else {
      addToFirebase(getDateID(date));
    }
  }

  function addToFirebase(dateID) {
    db.collection('users').doc(auth.currentUser.uid).collection('dates').doc(dateID).collection('myEvents').add({
      name: name,
      description: description,
      startTime: startTime,
      endTime: endTime
      //publicEvent: publicEvent
    }).then(() => {
        addToSharedEvetns();
    });
  }

  function addToSharedEvetns() {
    db.collection('users').doc(auth.currentUser.uid).collection('sharedEvents').add({
      eventID: eventID
    });
  }

  function textInAddEventButton() {
    if (isSharedEvent()) {
      return "Event Already Added!";
    } else {
      return "Add Event To My Plans";
    }
  }

  
function getDateID(passedDate) {
  for (let i = 0; i < datesList.length; i++) {
      if (datesList[i].event.date === passedDate) {
          return datesList[i].id;
      }
  }
  return false;
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

      <div>
        {deleteEventButton()}
      </div>

  

      <div>
          {comments.map(({id, comment})=> (
            <p>
                <strong>{comment.username}</strong> {comment.text}
            </p>
          ))}
      </div>

  
      <form className='post_commentbox'> 
          <input 
              className='post_input'
              type='text'
              placeholder='Add a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
          />
          <button
              className='post_button'
              disabled={!comment}
              type='submit'
              onClick={postComment}
          >
              <strong>Post</strong>
          </button>
        </form>

      

        

      <Comments userID={userID} dateID={dateID} eventID={eventID}></Comments> 
      
      {
      <div className="addEvent">      
        {addEventButton()}
      </div>
      }

    </Card>
  )
}

export default Event;