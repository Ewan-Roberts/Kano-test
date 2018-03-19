"use strict";

const request = require("request"),
	moment = require("moment"),
	event = require("./event");

// Pulls from userInformation file
event.on("fetchWeatherData", () => {
	
	//If user hasn"t set user info they can still play with this function

	   	request("insert", (error, response,body) => {

	        if (error) {event.emit("error", new Error("fetchweatherData: " + error))}

	        let obj = JSON.parse(body);

	       	if(moment().isBefore(moment(user.daytime[0], "HH:mm"))){

	    		obj.morning = true;	

	    	}
	    	
			event.emit("weather", obj)

	    });

});

