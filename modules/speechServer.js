
// server set up
const app = require("express")(),
	express = require("express"),
	https = require("https"),
	http = require("http"),
	path = require("path"),
	fs = require("fs"),
	event = require("./event"),
	request = require("request");


app.use(express.bodyParser());
app.set("port", process.env.PORT || 3014);
app.engine("html", require("ejs").renderFile);
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser("A secret"));
app.use(express.session());
app.use(app.router);
app.use(express.static("public"))


app.get("/", (req, res,next) => {

	res.sendfile("index.html", {"root": "../kano/public"})
});

let server = http.createServer(app);

server.listen(3014)

let io = require("socket.io").listen(server)

//Establish link with the front end and handle socket events
io.on("connection", socket => { 

    request("foo", (error, response,body) => {

        if (error) {event.emit("error", new Error("fetchweatherData: " + error))}

        let obj = JSON.parse(body);
    	
		console.log(obj)

		socket.emit('foo2',obj)

	});

    socket.emit('foo','hi')

});
