import Event from './event.js'
import React, { Component } from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsList: [],
        };
    }




     addStates() {
        const array = this.getData();
        const jsonArray = array.map(i => JSON.parse(i));
        this.setState({eventsList: jsonArray});

    }


    getData() {
        const jsonString1 = '{"ID":1, "name":"frisbee", "time": "8:30", "public":"True"}';
        const jsonString2 = '{"ID":2, "name":"soccer", "time": "7:00", "public":"False"}';
        return [jsonString1, jsonString2];
    }

    componentDidMount () {
        this.addStates();
    }

    render(){
        return (
            <>

            <p>"yoyoyo"</p>
            <div class = "test">
                {this.state.eventsList.map((event) => {
                    console.log(event);
                    if (event.ID !== 1) {
                        console.log("yay");
                        //return <p> {event.name} </p>
                        return Event(event.name, "hello", event.time, event.ID);
                    }
                })}

            </div>
            </>
        );
    }

    
}

export default Profile;
