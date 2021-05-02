import React, { useState } from 'react';
import PropTypes from "prop-types";
import Modal from "react-modal";
import "./navbar.scss";
import TimeConvert from "../../utils/TimeConverter";
import axios from 'axios';

Modal.setAppElement('#root')

function Navbar(props) {
    const { rooms, setActiveRoom, activeRoom, roomsData, setRoomsData } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [roomName, setRoomName] = useState("");

    function checkNewRoomName() {
        if (roomName === "") {
            document.getElementById('new-room__comment').innerHTML = 'Please enter room name';
            return false;
            } else {
            document.getElementById('new-room__comment').innerHTML = '';
            return true;
            }
        }

        const postData = () => {
            const dataToUpdate = {
            ...roomsData,
            ...{[roomName]: []}
            }    
            const prepareJSON = JSON.stringify(dataToUpdate)
    
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


    const createRoom = () => {
        if (checkNewRoomName()) {
            setModalIsOpen(false);
            postData();
            setRoomName("");
        }
    }

    return (
        <div className="navbar">
            {rooms.map((room, id) => (
                <button 
                    onClick={() => setActiveRoom(room)} 
                    key={`room-${id}`}
                    className={activeRoom===room ? "navbar-button navbar-button--active" : "navbar-button"}
                >
                    <div className="navbar-firstLine">
                        <div>{room}</div>
                        <div className="navbar-time">
                            {roomsData[room].length>0 ? TimeConvert(roomsData[room][roomsData[room].length-1].time) : ""}
                            </div>
                    </div>

                    <div className="nabar-lastMessage">
                        {roomsData[room].length>0 ? `${roomsData[room][roomsData[room].length-1].sender}: ${roomsData[room][roomsData[room].length-1].message}` : "no messages"}
                    </div>
                </button>
            ))}
            <button 
            onClick={() => setModalIsOpen(true)}
            className="navbar-button"
            >
                add room  + 
            </button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    content: {
                      right: '850px',
                      bottom: '700px',
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
                    <p id="new-room__comment" className="new-room__comment"></p>
                </div>
                <button 
                    onClick={createRoom} 
                    className="navbar-modal-button"
                >
                    Save
                </button>
                <button 
                    onClick={()=> setModalIsOpen(false)} 
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
    postData: PropTypes.func,
    setRoomsData: PropTypes.func,
};

export default Navbar
