import React, { useState } from 'react';
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from 'axios';

import "./navbar.scss";
import TimeConvert from "../../utils/TimeConverter";
import {postMessageUrl, messageHeaders} from "../../api/endpoints";

Modal.setAppElement('#root')

const Navbar = (props) => {
    const {rooms, setActiveRoom, activeRoom, roomsData, setRoomsData, setShowRoomsButton, showRoomsButton} = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [incorrectRoomName, setIncorrectRoomName] = useState(false);

    const checkNewRoomName = () => {
        if (roomName === "") {
            setIncorrectRoomName(true);
            return false;
            } else {
            setIncorrectRoomName(false);
            return true;
            }
    }

    const saveChatroom = () => {
        const dataToUpdate = {
        ...roomsData,
        ...{[roomName]: []}
        }    
        const prepareJSON = JSON.stringify(dataToUpdate)

        axios.put(
            postMessageUrl, 
            prepareJSON, 
            messageHeaders,
        )
        .then(res => {
            setRoomsData(res.data.record)
        })
        .catch(e => console.log(e));
    }


    const createRoom = () => {
        if (checkNewRoomName()) {
            setModalIsOpen(false);
            saveChatroom();
            setActiveRoom(roomName);
            setRoomName("");
        }
    }

    const closeNewRoom = () => {
        setIncorrectRoomName(false);
        setModalIsOpen(false);
    }

    const handleActiveRoom = (room) => {
        setActiveRoom(room);
        setShowRoomsButton(false);
    }

    const handleCreateRoom = () => {
        setModalIsOpen(true); 
        setShowRoomsButton(false);
    }

    return (
        <div className={showRoomsButton ? "navbar" : "navbar navbar__hidden"}>
            {rooms.map((room, id) => (
                <button 
                    onClick={() => handleActiveRoom(room)} 
                    key={`room-${id}`}
                    className={activeRoom===room ? (
                        "navbar-button navbar-button--active"
                     ) : (
                        "navbar-button"
                     )}
                >
                    <div className="navbar-firstLine">
                        <div className="room-name">{room}</div>
                        <div className="navbar-time">
                            {roomsData[room].length>0 ? TimeConvert(roomsData[room][roomsData[room].length-1].time) : ""}
                            </div>
                    </div>

                    <div className="nabar-lastMessage">
                        {roomsData[room].length>0 ? (
                            `${roomsData[room][roomsData[room].length-1].sender}: ${roomsData[room][roomsData[room].length-1].message}` 
                        ) : (
                            "no messages"
                        )}
                    </div>
                </button>
            ))}
            <button 
            onClick={handleCreateRoom}
            className="navbar-button navbar-button__new-room"
            >
                add room + 
            </button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={closeNewRoom}
                style={{
                    content: {
                        left: '40px',
                        top: '100px',
                        height: '190px',
                        width: '210px',
                    }
                  }}
            >
                <h2>Enter room name</h2>
                <div className="create-room-wrapper">
                    <input
                    type="text"
                    placeholder="Pls enter room name"
                    className="create-room-name"
                    onChange={(event) => setRoomName(event.target.value)}
                    />
                    {incorrectRoomName && 
                        <p className="new-room__comment">
                            Please enter room name
                        </p>
                    }
                </div>
                <button 
                    onClick={createRoom} 
                    className="navbar-modal-button"
                >
                    Save
                </button>
                <button 
                    onClick={closeNewRoom} 
                    className="navbar-modal-button"
                >
                    Cancel
                </button>
            </Modal>
        </div>
    )
}

Navbar.propTypes = {
    rooms: PropTypes.array,
    setActiveRoom: PropTypes.func,
    activeRoom: PropTypes.string,
    roomsData: PropTypes.object,
    saveChatroom: PropTypes.func,
    setRoomsData: PropTypes.func,
};

export default Navbar
