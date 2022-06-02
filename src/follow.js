import React from 'react'
import { useState, useEffect} from 'react';
import { auth, db } from './firebase.js';
import { Button } from '@mui/material';
import "./follow.css"

function Follow({followUser, name}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            setUser(authUser);
        } else {
            setUser(null);
        }
        })
        return () => {
        unsubscribe();
        }
    }, [user]);

    const follow = (event) => {
        event.preventDefault();

        db.collection('users').doc(user.uid).collection('following').add({
            user: followUser,
            username: name
        });
    }

    return (
        <div>
            <button className='followButton' onClick={follow}>Follow User</button>
        </div>
    )
}

export default Follow;