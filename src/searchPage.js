import React from 'react'
import { useState, useEffect } from 'react'
import "./searchPage.css"
import { db } from './firebase.js';
import { Modal, Button, Input, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import UserEvents from './userEvents.js';
import FriendProfile from './friendProfile';




function SearchPage() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("users").get();
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (account) =>
          account.user.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  return (
    <>
      <div>
        <Input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        {filteredUsers.map((account) => [
          <div key={account.id}>
          <FriendProfile id = {account.id} user = {account.user}/>
          </div>

        ])}
      </div>
    </>
  );
}
export default SearchPage;