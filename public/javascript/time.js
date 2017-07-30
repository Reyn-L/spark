function setTime() {
  ++total;
  let hour = parseInt(total/3600);
  let minute = parseInt(total/60);
  if(hour < 10){hour = "0" + hour;}
  if(minute < 10){minute = "0" + minute;}
  time.innerHTML = hour + ':' + minute;
}