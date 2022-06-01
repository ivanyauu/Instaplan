import React from 'react';
import './comments.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { db, auth } from './firebase';
import firebase from "firebase/compat/app";
import { Modal, Button, Input, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, IconButton, Paper, List } from '@mui/material';
import ModeCommentIcon from '@mui/icons-material/ModeComment';



function Comments({userID, dateID, eventID}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);

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

  

  return (
    <div className='commentButton'>
      <IconButton onClick={()=>setOpen(true)}>
            <ModeCommentIcon/>
      </IconButton>
      <Dialog aria-labelledby='dialog-title' open ={open} onClose = {() => setOpen(false)} PaperProps={{ sx: { width: "100%", height: "80%" } }} >
        <DialogTitle id = 'dialog-title'>Comments</DialogTitle>
          <DialogContent>
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
          </DialogContent>
      </Dialog>
    </div>
  )
}


export default Comments;