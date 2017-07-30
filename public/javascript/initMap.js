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

  //
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map, pos);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);

  let currentInfoWindow;

  map.addListener('click', function() {
    currentInfoWindow.close();
  });
  //
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

        const contentString = `${renter.address} $${renter.price}`;
        const infoWindowEl = document.createElement('div');
        infoWindowEl.addEventListener('click', function() {
          console.log('asdfasdf')
        })

        infoWindowEl.innerText = contentString;

        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowEl
        })

        marker.addListener('click', function() {
          if(currentInfoWindow) currentInfoWindow.close();

          currentInfoWindow = infoWindow;

          infoWindow.open(map, marker);
        });

      });
    })
  });
}

function getRenterMarkers() {
   return fetch('/data')
    .then(res => res.json())
}