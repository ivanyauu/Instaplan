import React, { useState } from "react";
import './modal.css'


const Modal = props => {

  const[eventMonth, setEventMonth]=useState(null)
  const[eventDay, setEventDay]=useState(null)
  const[eventYear, setEventYear]=useState(null)
  const[eventName, setEventName]=useState(null)
  const[eventDescription, setEventDescription]=useState(null)
  const[startHour, setStartHour]=useState(null)
  const[startMinute, setStartMinute]=useState(null)
  const[startAMPM, setStartAMPM]=useState(null)
  const[endHour, setEndHour]=useState(null)
  const[endMinute, setEndMinute]=useState(null)
  const[endAMPM, setEndAMPM]=useState(null)

  if(!props.show){
    return null
  }

  function updateEventMonth(val) {
    setEventMonth(val.target.value)
  }

  function updateEventDay(val) {
    setEventDay(val.target.value)
  }

  function updateEventYear(val) {
    setEventYear(val.target.value)
  }

  function updateEventName(val) {
    setEventName(val.target.value)
  }

  function updateEventDescription(val) {
    setEventDescription(val.target.value)
  }

  function updateStartHour(val) {
    setStartHour(val.target.value)
  }

  function updateStartMinute(val) {
    setStartMinute(val.target.value)
  }

  function updateStartAMPM(val) {
    setStartAMPM(val.target.value)
  }

  function updateEndHour(val) {
    setEndHour(val.target.value)
  }

  function updateEndMinute(val) {
    setEndMinute(val.target.value)
  }

  function updateEndAMPM(val) {
    setEndAMPM(val.target.value)
  }

  function onSubmit(){
    console.log(eventMonth)  
  }
  function onSubmit(){
    console.log(eventDay)  
  }
  function onSubmit(){
    console.log(eventYear)  
  }
  function onSubmit(){
    console.log(eventName)  
  }
  function onSubmit(){
    console.log(eventDescription)  
  }
  function onSubmit(){
    console.log(startHour)  
  }
  function onSubmit(){
    console.log(startMinute)  
  }
  function onSubmit(){
    console.log(startAMPM)  
  }
  function onSubmit(){
    console.log(endHour)  
  }
  function onSubmit(){
    console.log(endMinute)  
  }
  function onSubmit(){
    console.log(endAMPM)  
  }

  function submitEvent(){
    onSubmit();
    props.onClose();
  }
  
  return(
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">
            <span className="get-date">
              <select name="input-month" id="input-month" onChange={updateEventMonth}>
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
                <select name="input-day" id="input-day" onChange={updateEventDay}>
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
                <select name="input-year" id="input-year" onChange={updateEventYear}>
                    <optgroup label="Year">
                        <option year="2022">2022</option>
                        <option year="2023">2023</option>
                        <option year="2024">2024</option>
                        <option year="2025">2025</option>
                        <option year="2026">2026</option>
                    </optgroup> 
                </select>
              </span>
            <br></br>

            <input type="text" className="get-name" id='event-name' placeholder='Title' onChange={updateEventName}/>
            <br></br>
            <input type="text" className="get-description" id='event-description' placeholder='Description' size="50" onChange={updateEventDescription}/>
            <br></br>
            <label>start:
              <input type="text" pattern="\d*" className="get-start-time" name="start-time-hour" placeholder='00' maxLength="2" size="2" onChange={updateStartHour}/>
                  
              <input type="text" pattern="\d*" name="start-time-minute" placeholder='00' maxLength="2" size="2" onChange={updateStartMinute}/>
              <select onChange={updateStartAMPM}>
                <option ampm-start="am">AM</option>
                <option ampm-start="pm">PM</option>
              </select>
            </label>
            <br></br>
            <label>end:
            <span className="end-style">
              <input type="text" pattern="\d*" name="end-time-hour" placeholder='00' maxLength="2" size="2" onChange={updateEndHour} />
                  
              <input type="text" pattern="\d*" name="end-time-minute" placeholder='00' maxLength="2" size="2" onChange={updateEndMinute} />
            
              <select onChange={updateEndAMPM}>
                <option ampm-end="am">AM</option>
                <option ampm-end="pm">PM</option>
              </select>
            </span>
            </label>

            <div className="modal-footer">
          <button className="close-button" onClick={props.onClose}>Close</button>
          <button className="submit-button" onClick={submitEvent}>Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Modal;

