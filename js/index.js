/* global RestServer, Sensor */
'use strict';

(function() {
  var sensor = new Sensor('f9:2f:d6:50:1e:a2');
  var server = new RestServer();

  server.get('/restroom', function(response, request) {
    response.sendJSON({ floor: 5, rooms: [sensor.isAvailable, null] });
  });
  server.start();

  // XXX: Workaround to get the IP.
  setTimeout(function() {
    var ip = document.querySelector('#ip');
    ip.innerHTML = server.ip;
  }, 1000);
  var port = document.querySelector('#port');
  port.innerHTML = server.port;
}());
