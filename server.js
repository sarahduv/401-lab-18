'use strict';

const io = require('socket.io')(3000);

io.on('read_error', (socket) => {
  console.log('Read error', socket.id);
  socket.on('speak', (payload) => {
    io.emit('error message', payload);
  });
});

io.on('write_error', (socket) => {
  console.log('Write error', socket.id);
  socket.on('speak', (payload) => {
    io.emit('error message', payload);
  });
});

io.on('write_done', (socket) => {
  console.log('File saved', socket.id);
  socket.on('speak', (payload) => {
    io.emit('Message saved', payload);
  });
});



































// let allowedEvents = ['save','error'];
// let socketPool = {};
// let lifetime_connections = 0;

// function connections() {
//   return Object.values(socketPool).length;
// }

// server.on('connection', (socket) => {
//   const id = `Socket-` + lifetime_connections;
//   lifetime_connections++;
//   socketPool[id] = socket;
//   console.log('Got new connection! New count: ', connections());
//   socket.on('data', (buffer) => dispatchEvent(buffer));
//   socket.on('close', () => {
//     delete socketPool[id];
//     console.log('Lose one connection! New count: ', connections());
//   });
// });

// let dispatchEvent = (buffer) => {
//   let text = buffer.toString().trim();
//   console.log('received text', text);
//   const eventPayload = JSON.parse(text);

//   // Push to the pool that matches the event name
//   if ( allowedEvents.includes(eventPayload.event) ) {
//     console.log('broadcasting event to ', connections(), ' clients');
//     for (let socketId in socketPool) {
//       socketPool[socketId].write(JSON.stringify(eventPayload));
//     }
//   }
//   else {
//     console.log(`IGNORE ${event}`);
//   }
// };

