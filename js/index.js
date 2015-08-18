/* global RestServer */
'use strict';

(function() {
  var server = new RestServer();
  server.get('/restroom', function(response, request) {
    response.sendJSON({ floor: 5, rooms: [true, false] });
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
