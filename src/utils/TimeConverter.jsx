import React from 'react'

// function TimeConverter(time) {
//     const minutes = Math.floor((time / (1000 * 60)) % 60);
//     const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
//     return (`${hours} : ${minutes}`)
// };

function TimeConverter(milli) {
  let time = new Date(milli);
  let hours = time.getUTCHours();
  let minutes = time.getUTCMinutes();
  let seconds = time.getUTCSeconds();
  let milliseconds = time.getUTCMilliseconds();
  return hours + ":" + minutes + ":" + seconds;
};

export default TimeConverter;
