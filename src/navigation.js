import './navigation.css';
import { auth } from './firebase.js';
import { Input, Button, Modal, Box } from '@mui/material';

import React from "react";
import { NavLink } from "react-router-dom";

function Navigation(){
    return (
        
        <div className="navbar">
            <nav>
                <div className="meat">

                    <NavLink className="navhome" to="/">
                        Home
                    </NavLink>
                    <NavLink className="navprofile" to="/profile">
                        Profile
                    </NavLink>
                    <NavLink className="searchPage" to="/searchPage">
                        Search
                    </NavLink>
                    <div className="logOut" onClick={() => auth.signOut()}>Log Out</div>
                </div>
            </nav>
        </div>
    );
}

export default Navigation