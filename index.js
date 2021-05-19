const Discord = require('discord.js');
// const config = require('./config.json');
const fetch = require('node-fetch');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message=> {
	// console.log(message.content);
    if (!message.content.startsWith(prefix) || message.author.bot) return;
     const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (message.content.startsWith(`${prefix}ping`)) {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	} else if (message.content.startsWith(`${prefix}beep`)){
        message.channel.send('Boop');
    } else if (message.content.startsWith(`${prefix}server info`)) {
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal Number of members: ${message.guild.memberCount}`);
    } else if (message.content == `${prefix}user-info`) {
        message.channel.send(`Your Username: ${message.author.username}\nYour User ID: ${message.author.id}`)
    } else if ( command == 'args-info'){
        if (!args.length){
            return message.channel.send(`You didn't provide any arguments!!, ${message.author}`);
        } else if (args[0] == 'foo'){
            return message.channel.send("Bar")
        } 

        message.channel.send(`Command: ${command}\nArguements: ${args}\nFirst Arguements: ${args[0]}`);
    } else if (command == 'kick'){
        if (!message.mentions.users.size){
            return message.reply('No user tageed here!!');
        }
        const usertokick = message.mentions.users.first();
        message.channel.send(`You wanted to kick ${usertokick}?`);
    } else if (command == 'avatar'){
        if (!message.mentions.users.size){
            // return message.reply("No user tagged")
            return message.channel.send(`Your Avatar: ${message.author.displayAvatarURL({format: 'png', dynamic: true })}`)
        }
        // const user = message.mentions.users.first();
        const avatarlist = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`;
        });
        message.channel.send(avatarlist);
    }
    else if(command ==='joke') {
        let getJoke = async()=> {
            let result = await fetch('https://official-joke-api.appspot.com/random_joke');
            let  json= await result.json();
            return json;
        }
        let jokeValue = await getJoke();

        console.log(jokeValue);
        message.channel.send('hi');

    }
});

client.login(token);