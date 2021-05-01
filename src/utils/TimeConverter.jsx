import React from 'react'

function TimeConverter(time) {
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    return (`${hours} : ${minutes}`)
};

export default TimeConverter;
