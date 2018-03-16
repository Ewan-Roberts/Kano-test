"use strict";

//External libraries
const childProc = require("child_process"),
    
    //Internal libraries
    app = require("./modules/speechServer"),
    fetchWeatherData = require("./modules/fetchWeatherData"),
    event = require("./modules/event"),
    
    wikiQuery = require("./modules/wikiQuery")
    

