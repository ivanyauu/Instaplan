import Event from './event.js'
import { db } from './firebase.js';
import { useState, useEffect} from 'react';
import DatesEvents from './datesEvents.js';




function Profile ({username, passedDate}) {
    const [eventsList, updateEventsList] = useState([]);
    const [datesList, updateDatesList] = useState([]);
    const [displayDate, updateDisplayDate] = useState([]);
    const [todaysDate, updateTodaysDate] = useState([]);
    

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
        return "22zbt4skLZzQMnOzmqWA";
    }

    function loadIntoDateList (userID) {
        db.collection('users').doc(userID).collection('dates').onSnapshot(snapshot => {
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

    function dummyFetch() {
        getDateID(dateAsString(displayDate));
    }


    return(
        <>


            <div class = "headers">
                    


                    <h1>{"Displaying Plans for " + dateAsString(displayDate)} </h1>
                    <h2>{"Today's Date is " +  dateAsString(todaysDate)}</h2>
         
                    {dummyFetch()}

                    <DatesEvents userID = {getUserID()} dateID = {getDateID(dateAsString(displayDate))} date = {dateAsString(displayDate)}></DatesEvents>

                    {/*<button onClick={() => {loadIntoDateList(getUserID())}}></button>*/}
            </div>

        </>
        

    )





}

export default Profile;
/*
     addStates() {
        const allDays = this.getData();
        const daysAndEvents = allDays.map(dayX => {
            const date = JSON.parse(dayX[0]);
            const events = dayX[1].map(eventX => JSON.parse(eventX));
            date.allEvents = events;
            return date;

        })
        this.setState({eventsList: daysAndEvents});
        
    }


    getData() {
        const jsonString1 = '{"ID":1, "name":"frisbee", "time": "8:30", "public":"True"}';
        const jsonString2 = '{"ID":2, "name":"soccer", "time": "7:00", "public":"False"}';
        const jsonString3 = '{"ID":3, "name":"football", "time": "4:30", "public":"True"}';
        const jsonString4 = '{"ID":4, "name":"futbol", "time": "7:00", "public":"False"}';
        const jsonString5 = '{"ID":5, "name":"tennis", "time": "3:30", "public":"True"}';
        const jsonString6 = '{"ID":6, "name":"bball", "time": "1:00", "public":"False"}';
        const jsonString7 = '{"ID":7, "name":"baseball", "time": "9:30", "public":"True"}';
        const jsonString8 = '{"ID":8, "name":"softball", "time": "2:00", "public":"False"}';

        const jsonDay1 = '{"month":5, "day":23, "year":2022}';
        const jsonDay2 = '{"month":5, "day":24, "year":2022}';
        const jsonDay3 = '{"month":5, "day":25, "year":2022}';


        const day1 = [jsonDay1, [jsonString1, jsonString2, jsonString3]];
        const day2 = [jsonDay2, [jsonString4, jsonString5, jsonString6]];
        const day3 = [jsonDay3, [jsonString7, jsonString8]]

        return [day1, day2, day3];
    }

    

    
    whoAmI () {
        return "22zbt4skLZzQMnOzmqWA";
    }

     dateTodateID (userID) {
        this.state.eventsList = db.collection('users').doc(userID).collection('dates').onSnapshot(snapshot => {
          snapshot.docs.map(doc => ({
            id: doc.id,
            event: doc.data()
          }));
        })
        console.log(this.s)
     }

    displayEvents () {
        if (this.state.eventsList.length > 0) {
            const todaysEvents = this.state.eventsList.map(dateX => {
                if (dateX.month === this.state.displayDate.month && dateX.day === this.state.displayDate.day 
                    && dateX.year === this.state.displayDate.year) {
                    return (
                        [dateX.allEvents.ID, dateX.allEvents.time, dateX.allEvents.name, dateX.allEvents.public]
                    );
                }
            })
            return todaysEvents;
        }
    }

    render(){
        const today = new Date();
        const month = today.getMonth() + 1; //wasn't sure how to do this addition inside h2
        const myID = this.whoAmI();



        //const eventsToDisplay = this.displayEvents();
        return (
            <>
            <div class = "headers">
                <h1>{"Displaying Plans for " + this.state.displayDate.month + "/" + this.state.displayDate.day + "/" + this.state.displayDate.year} </h1>
                <h2>{"Today's Date is " +  month + "/" + today.getDate() + "/" + today.getFullYear()}</h2>
            </div>
            
            <div class = "events">
                {
                    //<DatesEvents userID ={this.whoAmI() dateID = }></DatesEvents>
                }
            </div>
            </>
        );
    }

    
}

export default Profile;


/*this.state.eventsList.map((eventX) => {
                    if (eventX.ID !== 1) {
                        return (
                            <div>
                                <p>{eventX.ID} {eventX.time} {eventX.name} {eventX.date}</p>
                            </div>
                        );
                    }
                })*/