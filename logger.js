'use strict';

const net = require('net');

const client = new net.Socket();

client.connect(3001, 'localhost', () => {
  console.log('logger.js is connected');
});

client.on('data', data => log(data));

/**
 * This function logs our events
 * @param {string} event
 * @param {data} payload
 */
function log(data_buffer) {
  const data = JSON.parse(data_buffer.toString());
  let event = data.event;
  let payload = data.payload;
  let time = new Date();
  if (event === 'save') {
    console.log({event, time, payload});
  } else if (event === 'error') {
    console.error({event, time, payload});
  }
}

exports.log = log;