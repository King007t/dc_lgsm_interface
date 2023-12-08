const fs = require('fs');
const config = require("../config.json");

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		config.locked = false;

		fs.writeFile(__dirname.replace('events', '') + "config.json", JSON.stringify(config), function writeJSON(err) {
			if (err) return console.log(err);
		});

		console.log(`${client.user.tag} HAS ARRIVED!`);
		console.log(`(The bot is running, connected to your Discord and ready to be used)`);
	}
};
