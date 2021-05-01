import './chat.scss';
import ChatRoom from "../../components/chatRoom/ChatRoom";
import Navbar from "../../components/navbar/Navbar";
import SettingsBar from "../../components/settingsBar/SettingsBar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat() {

  const [roomsData, setRoomsData] = useState({});
  const [activeRoom, setActiveRoom] = useState("room1");
  const [sender, setSender] = useState("Martynas");

  const getData = () => {
    axios.get(`https://api.jsonbin.io/v3/b/608407ea48f71c7a71cd288e/latest`, false)
    .then(res => {
      setRoomsData(res.data.record)
    })
  }

  const postData = () => {
    const dataToUpdate = roomsData;    
    const prepareJSON = JSON.stringify(roomsData)

    axios.put(
        "https://api.jsonbin.io/v3/b/608407ea48f71c7a71cd288e", 
        prepareJSON, 
        {headers: {
          "Content-Type": "application/json", 
          "X-Master-Key": "$2b$10$bLbTHa0ruz55FFhdAEDrqeVnw6nhKbtCy9BnKJW2DhE.mbDS9rzaG",
          "X-Bin-Versioning": false,
        }}
    )
    .then(res => {
      setRoomsData(res.data.record)
    })
    .catch(e => console.log(e));
  }

  function updateScroll(){
    let element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
}

  useEffect(() => {getData()}, []);
  useEffect(() => {updateScroll()}, [roomsData, activeRoom]);

  return (
    <div className="chat-app">
      <SettingsBar />
      <Navbar 
        rooms={Object.keys(roomsData)} 
        setActiveRoom={setActiveRoom}
        activeRoom={activeRoom}
        roomsData={roomsData}
        setRoomsData={setRoomsData}
      />
      <ChatRoom 
        roomData={roomsData[activeRoom]} 
        postData={postData}
        activeRoom={activeRoom}
        sender={sender}
        roomsData={roomsData}
        setRoomsData={setRoomsData}
      />
    </div>
  );
}

//websocket kas tai?

//kilo.health logo
//https://lh3.googleusercontent.com/a-/AOh14Gid-_tsS9Lt6Cv6YegrAtJHa1b_e-8ECMgg9frw=s40

export default Chat;
