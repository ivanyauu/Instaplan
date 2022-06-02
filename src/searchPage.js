import React from 'react'
import { useState, useEffect } from 'react'
import "./searchPage.css"
import { db } from './firebase.js';
import { Card } from '@mui/material';
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
    <div className='search'>
    <div className="wrapper">
           <div className="searchBar">
                <input onChange={(e) => setSearch(e.target.value)} id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search"  />
          </div>
    </div>
        {filteredUsers.map((account) => [
          <Card key={account.id} className = "user" style={{backgroundColor: "#f5f5f5"}}>
          <FriendProfile id = {account.id} user = {account.user}/>
          </Card>
        ])}
    </div>
  );
}
export default SearchPage;