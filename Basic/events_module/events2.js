const EventEmitter = require('events');
const event = new EventEmitter;

event.on('CheckPage', (sc, msg) => {
  console.log(`Status code ${sc}, and this page is ${msg}`);  
})

event.emit('CheckPage', 200, "OK")// means you can also pass the parameter.