/* global RestServer */
'use strict';

(function() {
  var server = new RestServer();
  server.get('/restroom', function(response, request) {
    var josn = { floor: 5, rooms: [true, false] };
    // TODO: Add new methods in response: sendJSON and sendJSONP.
    response.send(JSON.stringify(josn));
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
