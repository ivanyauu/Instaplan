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
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [likes,setLikes] = useState(0);
  const [liked,setLiked] = useState(false);

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
      <button class="like" onClick = {liked ? dislike : like}>
        like {likes}
      </button>

    </Card>
  )
}


export default Event;