/* global HTTPServer, IPUtils */

'use strict';

(function(exports) {
  function RestServer(options) {
    this.options = options || {};
    this._server = new HTTPServer(this.options.port || 8080);
    this._router = new Map();
    this._init();
  }

  RestServer.prototype = {
    ip: null,
    port: null,
    _server: null,
    _router: null,

    start: function() {
      this._server.start();
    },

    stop: function() {
      this._server.stop();
    },

    get: function(path, handler) {
      this._router.set(path, handler);
    },

    _init: function() {
      this._server.addEventListener('request', (evt) => {
        var request  = evt.request;
        var response = evt.response;
        if (request.path === '/') {
          response.send('<h1>It works!</h1>');
          return;
        } else if (!this._router.has(request.path)) {
          response.send('<h1>No such service!</h1>');
          return;
        }

        if (request.params.callback) {
          response.headers['Content-Type'] = 'text/javascript';
        } else {
          response.headers['Content-Type'] = 'application/json';
        }
        var handler = this._router.get(request.path);
        handler(response, request);
      });

      IPUtils.getAddresses((ip) => {
        this.ip = ip;
      });
      this.port = this._server.port;
    }
  };

  exports.RestServer = RestServer;
}(window));
