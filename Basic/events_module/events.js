const EventEmitter = require('events');
const event = new EventEmitter;

event.on('SayMyName', () => {
  console.log("Your name is Sagar");  
})
event.on('SayMyName', () => {
  console.log("Your Middle name is Dinkar");  
})
event.on('SayMyName', () => {
  console.log("Your Surname is Kurewar");  
})

event.emit('SayMyName')