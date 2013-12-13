/*
** JavaScript library for use with Node-IRC found on github
** Please make sure you have Node-IRC and Node-JS before using
** This library as it is required
*/

//So that we can use this as a library
exports.variables = variables;

//Used for storing the bot that is running the commands
var bot;
//Used for storing the channel that the commands are going to be run on
var channel;

var motd, social;

/*
** this function will be instantiated and used to store variables
** so that the library knows what bot and channel to send the messages
** on, if this is not completed there will more than likely be NPE's
*/
function variables(bot, channel, basic) {
	this.bot = bot; this.channel = channel
	this.motd = basic[0]; this.social = basic[1];
}

/*
** This function is used to send message from the bot to the
** channel that had been provided in the variables above, if
** these variables are not filled in, it will most likely give
** a null pointer exception
*/
variables.prototype.say = function say(message) {
	this.bot.say(this.channel, message);
	this.log("Message sent");
}

/*
** this will be used mostly for debugging and logging errors
** things that will go here are usually success messages and
** programs so that they can be prossesed
*/
variables.prototype.log = function log(message) {
	console.log(message);
}

/*
** This function is instantiated when you want your bot to say something
** Periodically. this function calls a message every so often using a time
** that you specify
*/
variables.prototype.Tmessage = function TMessage(message, time) {
	time = time * 1000;
	setInterval(function() { this.say(message) }, time);
	this.log("Interval set");
}

/*
** Basic Welcome message that can be used if you dont wish to create your own
*/
variables.prototype.welcome = function welcome(who) {
	this.say(who + " Welcome");
	this.log(who + " Joined");
}

variables.prototype.basicCommands = function basicCommands(text) {
	if (text.charAt(0) == "!") {
		switch(text.slice(1)) {
			case "motd":
			this.say(motd);
			//Put your MOTD here ("Remember kids, dont do drugs!")
			break;
			case "links":
			this.say(social);
			//Put your social links here (Youtube, Facebook, Twitter)
			break;
		}
	}
}

/*
** This function is used for timing out those in a twitch chat, better integration
** will come later for esper net and possible other IRC's
*/
variables.prototype.timeOut = function timeout(who) {
	this.say(".timeout " + who);
	this.log(who + " has been timed out");
}

/*
** This function will be used for banning those in a twitch chat, integration for
** esper net and other IRC's coming later :)
*/
variables.prototype.ban = function ban(who) {
	this.say(".ban " + who);
	this.log(who + " has been banned");
}