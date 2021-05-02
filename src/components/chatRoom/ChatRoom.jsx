import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import "./chatRoom.scss";
import "./chat.scss";
import { ReactComponent as Send } from "../../assets/icons/play.svg";
import TimeConvert from "../../utils/TimeConverter";

function ChatRoom(props) {
    const { roomData, postData, setRoomsData, roomsData, activeRoom, sender } = props;
    const [message, setMessage] = useState("");
    const [author, setAuthor] = useState("Martynas");

    const sendMessage = () => {

      const messageWithData = {
        sender: author,
        message: message,
        time: new Date().getTime()
      }
      
      const dataToUpdate = roomsData;
      dataToUpdate[activeRoom].push(messageWithData);
      setRoomsData(dataToUpdate);

      postData();

      document.getElementById("input-userName").value = "";
      document.getElementById("input-message").value = "";
    }

    return (
      <div className="chat__container">
        <Chat roomData={roomData} sender={sender} roomsData={roomsData} activeRoom={activeRoom} />
        <div className="chat__input">
        {/* <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="login-input"
            placeholder="Username"
            id="input-userName"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div> */}

        <div className="input-group">
          <label htmlFor="message"></label>
          <input
            type="text"
            name="text"
            className="text-input"
            placeholder="type a message..."
            id="input-message"
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

          <button
            type="button"
            className="button-send"
            onClick={message !== "" && sendMessage}>
              <Send className="button-send__logo" />
          </button>

        </div>
      </div>
    )
}


function Chat (props) {
  const { roomData, sender, roomsData, activeRoom } = props;

  if (roomData) {
    return (
        <div className="chat" >
          <div className="chat--bottom"id="chat" >
          {roomsData[activeRoom].map((room, id) => (
            <div key={`message-${id}`} className={room.sender===sender ? "message-send":"message-received"}>
              <div className="message-sender">{room.sender===sender || (id > 1 && room.sender===roomData[id-1].sender) ? "" : room.sender}</div>
              <div className="message-text">{room.message}</div>
              <div className="message-time">{TimeConvert(room.time)}</div>
            </div>
          ))}
          </div>
        </div>
    )
  } else {
    return (<div id="chat">no messages</div>)
  }
}

ChatRoom.propTypes = {
  roomData: PropTypes.array,
  postData: PropTypes.func,
  setRoomsData: PropTypes.func,
  roomsData: PropTypes.object,
  activeRoom: PropTypes.string,
  sender: PropTypes.string,
};

Chat.propTypes = {
  roomData: PropTypes.array,
  sender: PropTypes.string,
  roomsData: PropTypes.object,
  activeRoom: PropTypes.string,
};

export default ChatRoom;
