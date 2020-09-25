"use strict";

function initMap() {
  var mapProp = {
    center: new google.maps.LatLng(59.938624, 30.323085),
    zoom: 16,
    disableDefaultUI: true,
  };

  var map = new google.maps.Map(document.getElementById("map"), mapProp);
  var coordinates = {lat: 59.938624, lng: 30.323085};
  var image = "img/map-marker-svg.svg";
  var marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: image,
  });

  var noPoi = [
    {
      featureType: "poi",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  map.setOptions({styles: noPoi});
}
