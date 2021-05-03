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

  const getChatMessages = () => {
    axios.get(`https://api.jsonbin.io/v3/b/608407ea48f71c7a71cd288e/latest`, false)
      .then(res => {
        setRoomsData(res.data.record)
      })
  }

  const postMessages = () => {
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

  useEffect(() => {getChatMessages()}, []);
  useEffect(() => {updateScroll()}, [roomsData, activeRoom]);
  setInterval(getChatMessages(), 10000);

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
        postMessages={postMessages}
        activeRoom={activeRoom}
        sender={sender}
        roomsData={roomsData}
        setRoomsData={setRoomsData}
      />
    </div>
  );
}

export default Chat;
