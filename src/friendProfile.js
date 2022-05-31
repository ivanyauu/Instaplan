import React from 'react'
import { useState, useEffect } from 'react'
import "./searchPage.css"
import { db } from './firebase.js';
import { Modal, Button, Input, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import UserEvents from './userEvents.js';
import Follow from './follow.js';

function FriendProfile({id, user}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='profButton'>
      <Button onClick={()=>setOpen(true)}>
      {user}
      </Button>
      <Dialog aria-labelledby='dialog-title' open ={open} onClose = {() => setOpen(false)} PaperProps={{ sx: { width: "100%", height: "80%" } }} >
        <DialogTitle id = 'dialog-title'>{user}</DialogTitle>
          <DialogContent>
                <UserEvents key={id} userID={id} name={user} />
                <Follow followUser={id}/>
          </DialogContent>
      </Dialog>
    </div>
  )
}

export default FriendProfile;