const parkingBack = document.getElementById('parking-back');

parkingBack.addEventListener('click', function() {
  modal.className = 'modal';
});

const modal = document.getElementById('modal');
const modal_address_state = document.getElementById('address-state');
const modal_address_street = document.getElementById('address-street');
const modal_price = document.getElementById('parking-price');
const modal_img = document.getElementById('park-img');
const book_stall_btn = document.getElementById('book-this-stall');
const confirmation_modal = document.getElementById('booking-confirmation-modal');
const go_toTimerBtn = document.getElementById('go-to-timer');
const timer_modal = document.getElementById('timer-modal');
const checkout_btn = document.getElementById('checkout-btn');
const checkout_confirmation_modal = document.getElementById('checkout-confirmation-modal');
const time = document.getElementById('time');


checkout_btn.addEventListener('click', function() {
  clearInterval(timerInterval);
  total = 0;
  time.innerText = '00:00:00';
  timer_modal.className = '';
  checkout_confirmation_modal.className += 'active';
  setTimeout(function() {
    checkout_confirmation_modal.className = '';
  },2000);
});

let timerInterval;
let total = 0;


book_stall_btn.addEventListener('click', function() {
  modal.className = 'modal';


  confirmation_modal.className += ' active';
    setTimeout(function() {
    timerInterval = setInterval(setTime, 1000);
    confirmation_modal.className = '';
    timer_modal.className += 'active';
  }, 2000)
});

// go_toTimerBtn.addEventListener('click', function() {

//

//   confirmation_modal.className = '';
//   timer_modal.className += ' active';
// });

function modifyModal(address_state, address_street, price, imgUrl) {
  modal_address_street.innerText = address_street;
  modal_address_state.innerText = address_state;
  modal_price.innerText = price;
  modal_img.src = imgUrl;
}

function getDollar(amt) {
  if(amt < 10) {
    return '$'
  } else {
    return '$$'
  }
}

function initMap() {
  let map;

  //find current position of user
  navigator.geolocation.getCurrentPosition(function(position) {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
  };

  //create map with current position as center
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: pos,
    disableDefaultUI: true
  });

  map.setCenter(pos);

  map.addListener('click', function() {
    currentInfoWindow.close();
  });

  //create centerControl button on map
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map, pos);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);

  const marker = new google.maps.Marker({
    position: pos,
    map: map
  });

  //holder variable for the currentInfoWindow
  let currentInfoWindow;

  //get fake renter data and make markers to place on google map
  getRenterMarkers()
    .then(renters => {
      renters.forEach(renter => {
        const pos = {
          lat: parseFloat(renter.lat),
          lng: parseFloat(renter.long)
        };

        const marker = new google.maps.Marker({
          position: pos,
          icon: {
            url: 'bolt.png',
            scaledSize: new google.maps.Size(40, 40)
          },
          map: map
        });

        const dollarAmt = getDollar(renter.price);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'info-window';
        contentDiv.innerHTML = `${renter.address_street} ${renter.address_state} <span style='margin-left: 5px; font-weight: 600;'>${dollarAmt}</span>`;

        contentDiv.addEventListener('click', function() {
          console.log("clicked")
          modal.className += ' active'
          modifyModal(renter.address_state, renter.address_street, renter.price, renter.pictureUrl);
        })


        const infoWindow = new google.maps.InfoWindow({
          content: contentDiv
        })

        marker.addListener('click', function() {
          if(currentInfoWindow) currentInfoWindow.close();

          currentInfoWindow = infoWindow;

          infoWindow.open(map, marker);
        });

      });
    })
    .then(() => {
      const overlay = document.getElementsByClassName('logo-overlay');
      overlay[0].className += ' hidden';
    });
  });
}

function getRenterMarkers() {
   return fetch('/data')
    .then(res => res.json())
}