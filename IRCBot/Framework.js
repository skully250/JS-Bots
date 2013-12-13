var config = [
	server: "irc.esper.net",
	botName: "FrameBot250",
	channels: ["#skully250", "#ParaInst"],
	password: ""
];

var irc = require("irc");

var Bot = new irc.Client(config.server, config.botName, { 
	channels: config.channels;
	//password: config.password;
});

var commands = [];
var output = [];

var visitors = [];

function log(message) {
	console.log(message);
}

function say(bot, message) {
	bot.say(config.channels[0], message);
	log("Message sent");
}

bot.addListener("join", function(channel, who)) {
	say(Bot, who + " Welcome!");
	log(who + " Joined the chat");
	visitors.append(who);
}

bot.addListener("message", function(from, to, text, message)) {
	if (text.charAt(0) == "!") {
		switch(text.split(1)) {
			case "dance":
			break;
			case "hello":
			break;
		}
	}
}