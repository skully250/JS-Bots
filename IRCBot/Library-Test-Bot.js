var config = {
	channels : ["#skully250"],
	server : "irc.esper.net",
	twitch : "irc.twitch.tv",
	//Not my actual password its my IRC auth key
	password : "oauth:5p76faim47w7zt19mrj9cggwykm5h3t",
	botName : "Framebot250"
};

var irc = require("irc");
var framer = require("./Library");

var bot = new irc.Client(config.server, config.botName, { 
	channels: config.channels
	//password: config.password;
});

var frame = new framer.variables(bot, config.channels[0], ["Remember, Remember the something of something", "Facebook, twitter"]);

bot.addListener("join", function(channel, who) {
	//Basic welcome message is sent to those that join
	frame.welcome(who);
});

bot.addListener("message", function(from, to, text, message) {
	//Basic commands are added so that the bot can function properly :)
	frame.basicCommands(text);

	//Other commands would go under this
});