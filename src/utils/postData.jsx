import React from 'react';

function PostData = () => {
  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log("Post data got:");
      console.log(req.responseText);
    }
  };

  req.open("PUT", "https://api.jsonbin.io/v3/b/608407ea48f71c7a71cd288e", false);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2b$10$bLbTHa0ruz55FFhdAEDrqeVnw6nhKbtCy9BnKJW2DhE.mbDS9rzaG");
  req.setRequestHeader("X-Bin-Versioning", false);

  const dataToUpdate = roomsData;
  dataToUpdate[activeRoom].push(newMessage);
  setRoomsData(dataToUpdate);

  // console.log("dataToUpdate");
  // console.log(dataToUpdate);
  
  const prepareJSON = JSON.stringify(dataToUpdate)
  req.send(prepareJSON);
}

export default PostData
