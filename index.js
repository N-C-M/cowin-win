const Discord = require('discord.js');
// const config = require('./config.json');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	console.log(message.content);

    if (message.content === `${prefix}ping`) {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	} else if (message.content == `${prefix}beep`){
        message.channel.send('Boop')
    }

});

client.login(token);