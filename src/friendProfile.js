import React from 'react'
import { useState, useEffect } from 'react'
import "./searchPage.css"
import { db } from './firebase.js';
import { Modal, Button, Input, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import UserEvents from './userEvents.js';

function FriendProfile({id, user}) {
  const [open, setOpen] = useState(false);
  return (
    <>
    <Button onClick={()=>setOpen(true)}>
    {user}
    </Button>
    <Dialog aria-labelledby='dialog-title' open ={open} onClose = {() => setOpen(false)}>
      <DialogTitle id = 'dialog-title'>{user}</DialogTitle>
        <DialogContent>
              <UserEvents key={id} userID={id} name={user} />
        </DialogContent>
    </Dialog>
    </>
  )
}

export default FriendProfile