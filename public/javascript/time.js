function setTime() {
  ++total;
  let hour = parseInt(total/3600);
  let minute = parseInt(total/60);
  let second = total % 60;
  if(hour < 10){hour = "0" + hour;}
  if(minute < 10){minute = "0" + minute;}
  if(second < 10) {second = "0" + second;}
  time.innerHTML = hour + ':' + minute + ":" + second;
}