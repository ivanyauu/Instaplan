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
  const [buttonText, updateButtonText]=useState("Add Event To My Plans");
  const [likes,setLikes] = useState(0);
  const [liked,setLiked] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
        loadIntoDateList(auth.currentUser.uid);
        loadIntoSharedEvents(auth.currentUser.uid);
    }, 1000);
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
          {buttonText}
        </button> 
      )

    }
  }

  async function addEvent() {
    if (!isSharedEvent()) {//don't do anythign if the event is already shared shared event
      updateButtonText("Event Already Added");
      findOrCreateDate(date);//this calls addToFirebase
    }
    updateButtonText("Event Already Added");
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

  /*code to chance button appearence
  function textInAddEventButton() {
    if (isSharedEvent()) {
      return "Event Already Added!";
    } else {
      return "Add Event To My Plans";
    }
  }*/

  
function getDateID(passedDate) {
  for (let i = 0; i < datesList.length; i++) {
      if (datesList[i].event.date === passedDate) {
          return datesList[i].id;
      }
  }
  return false;
}




  const like = (event) => {
    event.preventDefault()
    
    const increment = firebase.firestore.FieldValue.increment(1);
    
  
    const likesRef = db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').doc(eventID).collection('likes').doc(`${Math.random()}`);
    const statsRef = db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').doc(eventID).collection('likes').doc(`--stats--`);
  
  
    db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').doc(eventID).collection('likes').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: auth.currentUser.displayName,
  });
  
    const batch = db.batch();
    batch.set(likesRef, { title: 'Like!' })
    batch.set(statsRef, { likeCount: increment }, { merge: true});
    batch.commit();
    setLikes(1);
    setLiked(true);
      
  };
  
  const dislike = (event) => {
    event.preventDefault()
    
    const decrement = firebase.firestore.FieldValue.increment(-1);
    const likesRef = db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').doc(eventID).collection('likes').doc(`${Math.random()}`);
    const statsRef = db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').doc(eventID).collection('likes').doc(`--stats--`);
  
    db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').doc(eventID).collection('likes').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: auth.currentUser.displayName,
  });
  
    const batch = db.batch();
    batch.set(likesRef, { title: 'Dislike!' })
    batch.set(statsRef, { likeCount: decrement }, { merge: true });
    batch.commit();
    setLikes(0);
    setLiked(false);
      
  };
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

      {/*        
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
      </form>*/}
      
      {
      <div className="addEvent">      
        {addEventButton()}
      </div>
      }
      <Comments userID={userID} dateID={dateID} eventID={eventID}></Comments> 
      <button class="like" onClick = {liked ? dislike : like}>
        like {likes}
      </button>

    </Card>
  )
}

export default Event;