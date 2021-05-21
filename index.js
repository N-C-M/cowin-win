const Discord = require('discord.js');
// const config = require('./config.json');
const fetch = require('node-fetch');
const axios = require('axios');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

const sampleUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message=> {
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
        // let getJoke = async () => {
        //     // let result = await fetch('https://official-joke-api.appspot.com/random_joke');

        let config = {
            headers: {
                accept: "application/json",
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
            }
          }
          const url = "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        //   axios.post(url, config).then(...)
                
            let result = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states', config);
            // let  json= await result.json();
            console.log(result.data.states);
            message.reply(JSON.stringify(result.data.states))
            // return json;
        }
        // let res = await result;
        // // fetch('https://official-joke-api.appspot.com/random_joke').then(function(response) {
        // //     console.log(response.json());
        // // });
        // let jokeValue =  await getJoke();
        // const url = "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        // axios.get(url, { headers: { 'User-Agent': sampleUserAgent } }).then((result) => {
        //     let  json = result.json();
        //     console.log(json)
        // });

        // console.log(jokeValue);
        // message.reply(`${jokeValue.setup}\n\n${jokeValue.punchline}`);

    
});


client.login(token);