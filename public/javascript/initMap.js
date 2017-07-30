function initMap() {
  let map;

  fetch('/data')
    .then(res => res.json())
    .then(console.log)

  navigator.geolocation.getCurrentPosition(function(position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
  };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13, //check the url to see how much zoom
    center: pos
  });

  const marker = new google.maps.Marker({
    position: pos,
    map: map
  });

  map.setCenter(pos);
  });
}
