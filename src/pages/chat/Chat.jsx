import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChatRoom from "../../components/chatRoom/ChatRoom";
import Navbar from "../../components/navbar/Navbar";
import SettingsBar from "../../components/settingsBar/SettingsBar";
import {getMessageUrl, postMessageUrl, messageHeaders} from "../../api/endpoints";
import './chat.scss';


const Chat = () => {
  const [roomsData, setRoomsData] = useState({});
  const [activeRoom, setActiveRoom] = useState("room1");
  const [showRoomsButton, setShowRoomsButton] = useState(false);
  const sender = "Martynas";
  
  const getChatMessages = () => {
    axios.get(getMessageUrl, false)
      .then(res => {
        setRoomsData(res.data.record)
      })
      .catch(e => console.log(e));
  }

  const postMessages = () => {
    const prepareJSON = JSON.stringify(roomsData)

    axios.put(
        postMessageUrl, 
        prepareJSON, 
        messageHeaders
    )
    .then(res => {
      setRoomsData(res.data.record)
    })
    .catch(e => console.log(e));
  }

  const updateScroll = () => {
    const element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
  }

  useEffect(() => {getChatMessages()}, []);
  useEffect(() => {updateScroll()}, [roomsData, activeRoom]);

  return (
    <div className="chat-app">
      <SettingsBar 
        setShowRoomsButton={setShowRoomsButton} 
        showRoomsButton={showRoomsButton}
      />
      <Navbar 
        rooms={Object.keys(roomsData)} 
        setActiveRoom={setActiveRoom}
        activeRoom={activeRoom}
        roomsData={roomsData}
        setRoomsData={setRoomsData}
        setShowRoomsButton={setShowRoomsButton}
        showRoomsButton={showRoomsButton}
      />
      <ChatRoom 
        roomData={roomsData[activeRoom]} 
        postMessages={postMessages}
        activeRoom={activeRoom}
        sender={sender}
        roomsData={roomsData}
        setRoomsData={setRoomsData}
        setShowRoomsButton={setShowRoomsButton}
      />
    </div>
  );
}

export default Chat;
