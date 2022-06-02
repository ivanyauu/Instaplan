import React from 'react'
import { useState } from 'react'
import "./searchPage.css"
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import UserEvents from './userEvents.js';
import Follow from './follow.js';
import "./friendProfile.css"
import SearchProfileEvents from './searchProfileEvents';


function FriendProfile({id, user}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className='profButton' onClick={()=>setOpen(true)}>
      {user}
      </button>
      <Dialog aria-labelledby='dialog-title' open ={open} onClose = {() => setOpen(false)} PaperProps={{ sx: { width: "100%", height: "80%" } }} >
        <DialogTitle id = 'dialog-title'>
          <h1>
          {user}
          </h1>
          <Follow followUser={id} name={user}/>
        </DialogTitle>
          <DialogContent>
                <SearchProfileEvents key={id} userID={id} name={user} />
          </DialogContent>
      </Dialog>
    </div>
  )
}

export default FriendProfile;