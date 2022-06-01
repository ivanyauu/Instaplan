import Event from './event.js'
import { db, auth } from './firebase';
import React, { useState, useEffect} from 'react';
import DatesEvents from './datesEvents.js';
import './profile.css';
import Modal from './modal.js'
import './firebase.js'




function Profile ({username, passedDate}) {
    const [datesList, updateDatesList] = useState([]);
    const [displayDate, updateDisplayDate] = useState([]);
    const [todaysDate, updateTodaysDate] = useState([]);
    const [show, setShow] = useState(false);
    

    useEffect(() => {
        const today = new Date();
        updateDisplayDate({month: today.getMonth() + 1, day: today.getDate(), year: today.getFullYear()});
        updateTodaysDate({month: today.getMonth() + 1, day: today.getDate(), year: today.getFullYear()});

        
    }, [])

    useEffect(() => {
    const interval = setInterval(() => {
        loadIntoDateList(getUserID());
    }, 100);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


    function getUserID () {
        return auth.currentUser.uid;
    }
    function getUsername () {
        return auth.currentUser.displayName;
    }

    function loadIntoDateList (passedUserID) {
        db.collection('users').doc(passedUserID).collection('dates').onSnapshot(snapshot => {
            updateDatesList(snapshot.docs.map(doc => ({
              id: doc.id,
              event: doc.data(),
            })));
        })
    }
    
    function getDateID (date) {
        for (let i = 0; i < datesList.length; i++) {
            if (datesList[i].event.date === date) {
                return datesList[i].id;
            }
        }
    }

    

    function dateAsString (date) {
        return date.month + "/" + date.day + "/" + date.year;
    }

    function updateDisplayMonthSelect(val) {
        updateDisplayDate({month: monthToNumber(val.target.value), day: displayDate.day, year: displayDate.year});
    }
    function updateDisplayDaySelect(val) {
        updateDisplayDate({month: displayDate.month, day: val.target.value, year: displayDate.year});
    }
    function updateDisplayYearSelect(val) {
        updateDisplayDate({month: displayDate.month, day: displayDate.day, year: val.target.value});
    }
    function numberToMonth(number){
        const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for(let i=1; i<13; i++){
            if(i === number){
                return months[i - 1];
            }
        }
    }
    function monthToNumber(eventMonth){
        const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const nums=[1,2,3,4,5,6,7,8,9,10,11,12];
        for(let i=0; i<months.length; i++){
          if(months[i] === eventMonth){
            return nums[i];
          }
        }
    }


    
    return(
        <>
            

            <div className = "headers">
                    
                    <h1>{"Welcome, " + getUsername() + "!"}</h1>
                    <h2>{"Today's Date is " +  dateAsString(todaysDate)}</h2>
                    <h3>{"Displaying Plans for"} </h3>
                    <div className = "Select Display Date">
                        <select value={numberToMonth(displayDate.month)} name="input-month" id="input-month" onChange={updateDisplayMonthSelect} required>
                            <optgroup label="Months">
                                <option month="1">January</option>
                                <option month="2">February</option>
                                <option month="3">March</option>
                                <option month="4">April</option>
                                <option month="5">May</option>
                                <option month="6">June</option>
                                <option month="7">July</option>
                                <option month="8">August</option>
                                <option month="9">September</option>
                                <option month="10">October</option>
                                <option month="11">November</option>
                                <option month="12">December</option>
                            </optgroup> 
                        </select>

                        <select value={displayDate.day} name="input-day" id="input-day" onChange={updateDisplayDaySelect} required>
                            <optgroup label="Day">
                                <option day="1">1</option>
                                <option day="2">2</option>
                                <option day="3">3</option>
                                <option day="4">4</option>
                                <option day="5">5</option>
                                <option day="6">6</option>
                                <option day="7">7</option>
                                <option day="8">8</option>
                                <option day="9">9</option>
                                <option day="10">10</option>
                                <option day="11">11</option>
                                <option day="12">12</option>
                                <option day="13">13</option>
                                <option day="14">14</option>
                                <option day="15">15</option>
                                <option day="16">16</option>
                                <option day="17">17</option>
                                <option day="18">18</option>
                                <option day="19">19</option>
                                <option day="20">20</option>
                                <option day="21">21</option>
                                <option day="22">22</option>
                                <option day="23">23</option>
                                <option day="24">24</option>
                                <option day="25">25</option>
                                <option day="26">26</option>
                                <option day="27">27</option>
                                <option day="28">28</option>
                                <option day="29">29</option>
                                <option day="30">30</option>
                                <option day="31">31</option>
                            </optgroup> 
                        </select>

                        <select value={displayDate.year} name="input-year" id="input-year" onChange={updateDisplayYearSelect} required>
                            <optgroup label="Year">
                                <option year="2022">2022</option>
                                <option year="2023">2023</option>
                                <option year="2024">2024</option>
                                <option year="2025">2025</option>
                                <option year="2026">2026</option>
                            </optgroup> 
                        </select>

                    </div>


                    <div className='event-maker'>
                        <button className='open-modal' onClick={() => setShow(true)}>
                            Add Event
                        </button>
                        <Modal dl={datesList} title="New Event" onClose={() => setShow(false)} show={show} date={displayDate}></Modal>
                    </div>

                    <DatesEvents userID = {getUserID()} dateID = {getDateID(dateAsString(displayDate))} profileBool={true}></DatesEvents>

                    {/*<button onClick={() => {console.log(getUserID())}}> </button>*/}
            </div>

            
        </>
    )
}

export default Profile;