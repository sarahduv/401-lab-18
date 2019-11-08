'use strict';

const events = require('./events.js');

function connectToServer(client) {
  client.connect(3001, 'localhost', () => {
    console.log('app.js is connected to server.js');
  });

  events.on('read_error', (data) => {
    client.write(JSON.stringify({event: 'error', payload: data}));
    client.destroy();
  });
  events.on('write_error', (data) => {
    client.write(JSON.stringify({event: 'error', payload: data}));
    client.destroy();
  });
  events.on('write_done', (data) => {
    client.write(JSON.stringify({event: 'save', payload: data}));
    client.destroy();
  });
}

module.exports = connectToServer;