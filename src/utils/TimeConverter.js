const TimeConverter = (milli) => {
  let time = new Date(milli);
  let hours = time.getUTCHours();
  let minutes = time.getUTCMinutes();

  if (hours<10) {
      hours = "0" + hours.toString();
  };

  if (minutes<10) {
      minutes = "0" + minutes.toString();
  };


  return hours + ":" + minutes;
};

export default TimeConverter;
