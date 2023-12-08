const fs = require('fs');
const { Client, Collection } = require('discord.js');

const { token } = require('./config.json');

const client = new Client();

client.commands = new Collection();

const commandFiles = fs.readdirSync(__dirname + '/commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command)
}

// Load event files

const eventFiles = fs.readdirSync(__dirname + '/events/').filter(file => file.endsWith('.js'));

// Handle events depending on their method (once, on)

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(token);