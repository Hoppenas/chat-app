import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "./settingsBar.scss";
import { ReactComponent as SettingsLogo } from "../../assets/icons/gear-fill.svg";
import { ReactComponent as SignOutLogo } from "../../assets/icons/box-arrow-right.svg";
import axios from 'axios';

Modal.setAppElement('#root');

function SettingsBar() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newBirthday, setNewBirthday] = useState("");

    const getData = () => {
        axios.get(`https://api.jsonbin.io/b/608b21ed8a409667ca00ae8a/latest`, false)
        .then(res => {
            setUserData(res.data);
        })
    }

    const postData = () => {
        const newUserData = userData;

        if (newEmail != "") {newUserData.email=newEmail}
        if (newPassword !== "") { newUserData.password=newPassword}
        if (newBirthday !== "") { newUserData.birthday=newBirthday}
          
        const prepareJSON = JSON.stringify(newUserData)
    
        axios.put(
            "https://api.jsonbin.io/b/608b21ed8a409667ca00ae8a", 
            prepareJSON, 
            {headers: {
              "Content-Type": "application/json", 
              "X-Master-Key": "$2b$10$bLbTHa0ruz55FFhdAEDrqeVnw6nhKbtCy9BnKJW2DhE.mbDS9rzaG",
              "X-Bin-Versioning": false,
            }}
        )
        .then(res => {
            setUserData(res.data.data);
        })
        .catch(e => console.log(e));
      }

    useEffect(() => {getData()}, []);

    function checkPassword() {
        if (newPassword === "") {return true} 
        
        if (userData.password !== newPassword) {
            document.getElementById('settings-password__comment').innerHTML = '';
            return true;
        } else {
            document.getElementById('settings-password__comment').innerHTML = 'Same password, please enter new one';
            return false;
        }
      }

    function checkEmail() {
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (newEmail==="") {
            return true;
        }

        if (!filter.test(newEmail)) {
            document.getElementById('settings-email__comment').innerHTML = 'Please provide a valid email address';
            return false;
        } else {
            document.getElementById('settings-email__comment').innerHTML = '';
            return true;
        }
    }

    const submit = () => {
        if (checkEmail() & checkPassword()) {
            postData();
        }
    }

    return (
      <div className="settings">
            <Link to="/">
                <SignOutLogo className="logo" />
            </Link>
            <SettingsLogo className="logo" onClick={() => setModalIsOpen(true)} />
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
            <div className="settings-modal-wrapper">
                <h2>Settings</h2>
                <div className="settings-input">
                    <div className="settings-input__p">Your email: {userData.email}</div>
                    <input 
                        type="text" 
                        placeholder="New email"
                        onChange={(event) => setNewEmail(event.target.value)}
                    />
                    <p id="settings-email__comment" className="settings-comment"></p>
                </div>
                <div className="settings-input">
                    <div className="settings-input__p">your birthday: {userData.birthday}</div>
                    <input 
                        type="date" 
                        placeholder="Change birthday"
                        onChange={(event) => setNewBirthday(event.target.value)}
                    />
                    <p id="settings-birthday__comment" className="settings-comment"></p>
                </div>
                <div className="settings-input">
                    <div className="settings-input__p">Change password</div>
                    <input 
                        type="password" 
                        placeholder="New password"
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                    <p id="settings-password__comment" className="settings-comment"></p>
                </div>
                <div className="settings-buttons-wrapper">
                    <button onClick={submit} className="settings-button">Save</button>
                    <button onClick={()=> setModalIsOpen(false)} className="settings-button">Close</button>
                </div>
            </div>
            </Modal>
      </div>
    )
}

export default SettingsBar;
