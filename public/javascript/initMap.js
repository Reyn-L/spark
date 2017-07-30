function initMap() {
  let map;



  navigator.geolocation.getCurrentPosition(function(position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
  };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14, //check the url to see how much zoom
    center: pos
  });

  const marker = new google.maps.Marker({
    position: pos,
    map: map
  });

  map.setCenter(pos);

  getRenterMarkers()
    .then(renters => {
      renters.forEach(renter => {
        console.log(renter)
        const pos = {
          lat: parseFloat(renter.lat),
          lng: parseFloat(renter.long)
        };

        const marker = new google.maps.Marker({
          position: pos,
          map: map
        });
      });
    })
  });
}

function getRenterMarkers() {
   return fetch('/data')
    .then(res => res.json())
}