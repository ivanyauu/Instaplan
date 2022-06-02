import './App.css';
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./navigation.js";
import Profile from "./profile.js";
import Home from "./home.js";
import { auth, db } from './firebase.js';
import { useState, useEffect} from 'react';
import { Input, Button, Modal, Box } from '@mui/material';
import SearchPage from './searchPage.js'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        setUser(authUser);
        //setUserid(authUser.uid);
      } else {
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username]);

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      });
    })
    .catch((error) => {
      alert(error.message + ' Please try again.')
    });

    // db.collection('users').add({
    //   user: username,
    // });
    db.collection('users').doc(auth.currentUser.uid).set({
      user: username,
    });

    setOpen(false);
  }
  const addtodb = (event) => {
    event.preventDefault();
    db.collection('users').doc(user.uid).set({
      user: username,
    });
    
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    
    setOpenSignIn(false);
  }

  return (
    <div className="app">
      
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
        <form className='app_signup'>
          <Input 
              placeholder = 'username'
              type = 'text'
              value = {username}
              onChange = {(e) => setUsername(e.target.value)}
          />
          <Input 
              placeholder = 'email'
              type = 'text'
              value = {email}
              onChange = {(e) => setEmail(e.target.value)}
          />
           <Input 
              placeholder = 'password'
              type = 'password'
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
          /> 
          <Button type='submit' onClick={signUp}>Sign Up</Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <form className='app_signin'>
            <Input 
                placeholder = 'email'
                type = 'text'
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
            />
            <Input 
                placeholder = 'password'
                type = 'password'
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
            /> 
            <Button type='submit' onClick={signIn}>Sign In</Button>
          </form>
        </Box>
      </Modal>
      <div className='app_header'>
          {auth.currentUser ?  (
            <div>
              <Router>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/searchPage" element={<SearchPage />} />
                </Routes>
              </Router>
            
            </div>
            
          ) : (
            <div className='log'>
              <div className='top'>
              {user ? (
                <div className='logOut'>
                  <Button onClick={() => auth.signOut()}>Log Out</Button>
                </div>
              ): (
                <div className='app_loginContainer'>
                  <div className='signIn'>
                    <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                  </div>
                  <div className='signUp'>
                    <Button onClick={() => setOpen(true)}>Sign Up</Button>
                  </div>
                  
                </div>
              )}
              <h3>You need to login to upload</h3>
            </div>
            </div>
          )}
          
        
      </div>
      

    </div>
  )
}

export default App;

