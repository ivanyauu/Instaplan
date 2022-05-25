import Event from './event.js'
import React, { Component } from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsList: [],
            displayDate: [],
            todaysDate: []
        };
    }




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

    componentDidMount () {
        const today = new Date();
        this.setState({displayDate: {month: today.getMonth() + 1, day: today.getDate(), year: today.getFullYear()}});
        this.addStates();
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
        const eventsToDisplay = this.displayEvents();
        return (
            <>
            <div class = "headers">
                <h1>{"Displaying Plans for " + this.state.displayDate.month + "/" + this.state.displayDate.day + "/" + this.state.displayDate.year} </h1>
                <h2>{"Today's Date is " +  month + "/" + today.getDate() + "/" + today.getFullYear()}</h2>
            </div>

            <div class = "test">
                {
                    eventsToDisplay.map(eventX => <p>{eventX[0]}  {eventX[1]} {eventX[2]} {eventX[3]}</p>)
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