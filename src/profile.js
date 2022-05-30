import './profile.css';
import Modal from './modal.js'
import React, {useState} from 'react';

function Profile() {
    const [show, setShow] = useState(false)
    return(
        <div className="profile">


            <select name="input-month" id="input-month" required>
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
            <select name="input-day" id="input-day" required>
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
            <select name="input-year" id="input-year" required>
                <optgroup label="Year">
                    <option year="2022">2022</option>
                    <option year="2023">2023</option>
                    <option year="2024">2024</option>
                    <option year="2025">2025</option>
                    <option year="2026">2026</option>
                </optgroup> 
            </select>

            <div className='event-maker'>
                <button className='open-modal' onClick={() => setShow(true)}>
                    Add Event
                </button>
                <Modal title="New Event" onClose={() => setShow(false)} show={show}></Modal>
            </div>

        </div>
    );
}

export default Profile;
