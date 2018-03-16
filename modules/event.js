"use strict";
//Sets up the global event emitter for each event to hook to
const EventEmitter = require("events");

let obj = new EventEmitter();

module.exports = obj;

//Error handing
obj.on("error", (err,msg) => {console.error("Error: ", err)})