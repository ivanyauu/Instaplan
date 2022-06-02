import React from 'react'
import { useState, useEffect} from 'react';
import { auth, db } from './firebase.js';
import { Button } from '@mui/material';

function Follow({followUser, name}) {
    const [user, setUser] = useState(null);
    const [clicked, setClicked] = useState(false);

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
        setClicked(true);
    }

    return (
        <div>
            {clicked ? (
                <Button>Following</Button>
            ): (
                <Button onClick={follow}>Follow User</Button>
            )
            }
            
        </div>
    )
}

export default Follow;