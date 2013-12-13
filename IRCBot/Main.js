var config = {
	channels : ["#skully250"],
	server : "irc.esper.net",
	twitch : "irc.twitch.tv",
	password : "oauth:5p76faim47w7zt19mrj9cggwykm5h3t",
	botName : "Skullbot250",
	opList : [
	"skully250",
	"MidnightExterminator",
	"Strayswordsman"
	],
	badWords : ["lol"]
};

//These values control certain aspects of the command messages
var task = "Me, making me better :)";
var game = "OSU!, a rythim based beat game";
var motd = "This stream isn't all that bad, there are just ALOT of screw-arounds :)";

//Please make sure you have nodeJS installed and have installed nodeIRC
var irc = require("irc");

//For time outs and bans :)
var timeOuts = [];
var secondTime = [];
var visitor = [];

//As illustrated above, please have NodeJS and NodeIRC
var bot = new irc.Client(config.server, config.botName, {
	channels : config.channels,
	password : config.password
});


//Functions under this are just for easability
function log(message) {
	console.log(message);
}

function timeOut(name) {
	say(".timeout " + name);
	log(name + " was timed out");
}

function ban(name) {
	say("Well now your banned " + name + " have fun!");
	say(".ban " + name);
	log(name + " was banned");
}

function say(message) {
	bot.say(config.channels[0], message);
	log("Message sent");
}

function seconds(seconds) {
	second = seconds * 1000;
	return second;
}

//Timed messages on set intervals
var donate = setInterval(function() {say("Donation links below, feel free :)")}, seconds(300));
var social = setInterval(function() {say("You can contact skully on many social networking sites including twitter and youtube, links below")}, seconds(540));
var partners = setInterval(function() {say("You can find one of skullies many partners at http://www.twitch.tv/strayswordsman he's awesome :D")}, seconds(1020));


//Most listeners are under this 
//"Join" is for when someone joins a channel
bot.addListener("join", function(channel, who) {
	if (who != "Skullbot250" || who != "skullbot250") {
		bot.say(channel, who + " Welcome to the stream. use !commands for commands");
		log(who + " Joined the stream");
		visitor.append(who);
	} else {
		log("I Joined the chat");
	}
});

//Part is for when someone leaves a channel
bot.addListener("part", function(channel, nick, reason, message) {
	log(nick + " has left us :(");
});

//Bad word listener (Implemented later ;D)
bot.addListener("message", function(from, to, text, message) {
	var textArray = text.split(" ");
	for (var text in config.badWords) {
		//IndexOf if string not found returns -1
		if (text.indexOf(config.badWords[text]) != -1) {
			timeout(from);
		}
	}
});

//Message is when a message is sent in any channel that the bot is connected in
bot.addListener("message", function(from, to, text, message) {

	//Regular commands that are going to be used during the stream
	if (text.charAt(0) == "!") {
		switch(text.slice(1)) {

			case "game":
			say("He is currently playing " + game);
			log(from + " Requested game");
			break;

			case "music":
			say("He usually listens to pandora or clowndubstep");
			say("they can be found at http://www.pandora.com/ and http://www.youtube.com/user/ClownDubstep");
			log(from + " Requested music");
			break;

			case "paranoia":
			say("Paranoia Instinctive is a relatively new company founded by skully and stray, with the intention to make awesome games for all to play");
			log(from + " Requested Paranoia");
			break;

			case "programming":
			say("He is currently programming " + task);
			log(from + " Requested Programming");
			break;

			case "request":
			say("To request a song, grab the osu beatmap site link and post it here :)");
			log(from + " Would like to request a song");
			break;

			case "motd":
			say("Hey guys there are many places you can catch me on including Youtube and Twitter");
			say("Find the info and links below");
			log(from + " Requested the MOTD");
			break;

			case "commands":
			say("The current commands are !game, !music, !paranoia, !programming, !request, !motd and !artist");
			say("Using + and then a command will give you info on the command");
			log(from + " Requested Commands");
			break;

			case "artist":
			say("Skully is currently looking for an artist to do some art for his channel!");
			say("If you think you can help, please PM him :)");
			log(from + " Requested Artist");
			break;

			case "languages":
			say("Skully codes in a number of languages including C languages, Java, Javascript, Python, HTML and more");
			log("languages sent");
			break;

			case "skullbot":
			say("I am a customly created bot made in Javascript, my source code will be available later");
			say("For now watch me be developed :)");
			break;
		}

		for (var op in config.opList) {
			if (from == config.opList[op]) {
				var TArray = text.split(" ");
				if (TArray[0] == "!ban") {
					var name = TArray[1];
					ban(name);
				}
				else if (TArray[0] == "!to") {
					var name = TArray[1];
					timeout(name);
				}
			}
		}
	}

	//Helper commands for those that need clarification
	if (text.charAt(0) == "+") {
		switch(text.slice(1)) {

			case "game":
			say("Will give info on the game i'm currently playing aswell as future games (if im not feeling lazy");
				log("Game info given to " + from);
				break;

				case "music":
				say("Will give info on the music that he listens to on a regular basis, may be changed later");
				log("Music info given to " + from);
				break;

				case "programming":
				say("Will give info on what he is currently programming including current projects or ME! :D");
				log("Programming info given to " + from);
				break;

				case "paranoia":
				say("Paranoia is a game company created by StraySwordsman and skully");
				log("Paranoia info given to " + from);

				case "request":
				say("Will tell you how to request a song when he is playing OSU! :)");
				log("Request Info given to " + from);
				break;

				case "motd":
				say("Will give a message that will be changed periodically");
				log("MOTD info given to " + from);
				break;

				case "artist":
				say("Currently asking for an artist, please help ;_;");
				log("Artist Info given to " + from);
				break;

			}
		}
	});