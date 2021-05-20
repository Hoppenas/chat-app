import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import axios from 'axios';
import {Link} from "react-router-dom";
import {loginUrl, settingsUrl, settingsHeaders} from "../../api/endpoints";

import "./settingsBar.scss";
import {ReactComponent as SettingsLogo} from "../../assets/icons/gear-fill.svg";
import {ReactComponent as SignOutLogo} from "../../assets/icons/box-arrow-right.svg";

Modal.setAppElement('#root');

const SettingsBar = (props) => {
    const {setShowRoomsButton, showRoomsButton} = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [newEmail, setNewEmail] = useState("");
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const [newBirthday, setNewBirthday] = useState("");

    const getUserData = () => {
        axios.get(settingsUrl, false)
        .then(res => {
            setUserData(res.data);
        })
        .catch(e => console.log(e));
    }

    const postUserData = () => {
        const newUserData = userData;

        if (newEmail !== "") {newUserData.email=newEmail}
        if (newPassword !== "") { newUserData.password=newPassword}
        if (newBirthday !== "") { newUserData.birthday=newBirthday}
          
        const prepareJSON = JSON.stringify(newUserData)
    
        axios.put(
            loginUrl, 
            prepareJSON, 
            settingsHeaders
        )
        .then(res => {
            setUserData(res.data.data);
        })
        .catch(e => console.log(e));
    }

    useEffect(() => getUserData(), [modalIsOpen]);


    const checkPassword = () => {
        if (newPassword === "") {
            setIncorrectPassword(false);
            return true;
        } 
        
        if (userData.password !== newPassword) {
            setIncorrectPassword(false);
            return true;
        } else {
            setIncorrectPassword(true);
            return false;
        }
      }

    const checkEmail = () => {
        // eslint-disable-next-line
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (newEmail==="") {
            return true;
        }

        if (!filter.test(newEmail)) {
            setIncorrectEmail(true);
            return false;
        } else {
            setIncorrectEmail(false)
            return true;
        }
    }

    const handleSubmit = () => {
        if (checkEmail() & checkPassword()) {
            postUserData();
            setNewEmail("");
            setNewPassword("");
            setNewBirthday("");
        }
    }

    const handleClose = () => {
        setNewEmail("");
        setNewPassword("");
        setNewBirthday("");
        setModalIsOpen(false);
        setIncorrectEmail(false);
        setIncorrectPassword(false);
    }

    const signOut = () => {
        localStorage.setItem("isAuthentificated", false);
        setUserData({});
    }

    return (
      <div className="settings">
            <Link to="/">
                <SignOutLogo className="logo" onClick={signOut} />
            </Link>
            <button 
                className="rooms-button"
                onClick={()=> setShowRoomsButton(!showRoomsButton)}
            >
                Rooms
            </button>
            <SettingsLogo 
                className="logo" 
                onClick={() => setModalIsOpen(true)} 
            />
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    content: {
                      left: '40px',
                      top: '100px',
                      height: '350px',
                      width: '250px',
                    }
                  }}
            >
            <div className="settings-modal-wrapper">
                <h2>Settings</h2>
                <div className="settings-input">
                    <div className="settings-input__p">
                        Your email: {userData.email}
                    </div>
                    <input 
                        type="text" 
                        placeholder="New email"
                        onChange={(event) => setNewEmail(event.target.value)}
                    />
                    {incorrectEmail && 
                        <p id="settings-email__comment" className="settings-comment">
                            Please provide a valid email address
                        </p>
                    }
                </div>
                <div className="settings-input">
                    <div className="settings-input__p">
                        your birthday: {userData.birthday}
                    </div>
                    <input 
                        type="date" 
                        placeholder="Change birthday"
                        onChange={(event) => setNewBirthday(event.target.value)}
                    />
                </div>
                <div className="settings-input">
                    <div className="settings-input__p">
                        Change password
                    </div>
                    <input 
                        type="password" 
                        placeholder="New password"
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                    {incorrectPassword && 
                        <p className="settings-comment">
                            Same password, please enter new one
                        </p>
                    }
                </div>
                <div className="settings-buttons-wrapper">
                    <button 
                        onClick={handleSubmit} 
                        className="settings-button"
                    >
                        Save
                    </button>
                    <button 
                        onClick={handleClose} 
                        className="settings-button"
                    >
                        Close
                    </button>
                </div>
            </div>
            </Modal>
      </div>
    )
}

export default SettingsBar;
