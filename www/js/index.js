/* global $ */
'use strict';

(function() {
  var RESTROOM_API = "http://10.247.34.241:8080/restroom?callback=?";
  var TIMER_INTERVAL = 100;
  var restroom1 = document.querySelector('#restroom1');

  setRestroomAvailability();

  function setRestroomAvailability() {
    $.getJSON(RESTROOM_API, {
      format: "json"
    })
    .done(function(data) {
      if (data.rooms[0]) {
        restroom1.style.backgroundColor = 'green';  
      } else {
        restroom1.style.backgroundColor = 'red';
      }
      setTimeout(function() {
        setRestroomAvailability(); 
      }, TIMER_INTERVAL);
    });
  }
}());
