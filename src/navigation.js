import './navigation.css';
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
                    
                </div>
                
            </nav>
        </div>
    );
}

export default Navigation