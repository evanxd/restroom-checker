/* global five, BleSerialPort */
'use strict';

(function(exports) {
  function Sensor(address) {
    this.address = address;
    this._init();
  }

  Sensor.prototype = {
    isAvailable: true,

    _init: function() {
      var serialPort = new BleSerialPort({ address: this.address });
      serialPort.connect().then(() => {
        var board = new five.Board({ port: serialPort, repl: false });
        // XXX: Workaround to wait for the board is ready.
        setTimeout(() => {
          // LED is for notifying user that the board is ready.
          var led = new five.Led(7);
          led.on();
          var toggleSwitch = new five.Switch(6);
          toggleSwitch.on('close', () => {
            this.isAvailable = false;
            console.log('closed');
          });
          toggleSwitch.on('open', () => {
            this.isAvailable = true;
            console.log('open');
          });
        }, 10000);
      });
    }
  };

  exports.Sensor = Sensor;
}(window));
