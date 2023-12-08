const { prefix, msgsec } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Prints help about Bot.',
	execute(message, args) {
		message.channel.send(`__**MANAGEMENT COMMANDS**__\n1. \`\`${prefix}start\`\`\n2. \`\`${prefix}stop\`\`\n3. \`\`${prefix}restart\`\`\n4. \`\`${prefix}backup\`\`\n5. \`\`${prefix}update\`\`\n6. \`\`${prefix}force-update\`\`\n\n__**INFO COMMANDS**__\n1. \`\`${prefix}info\`\`\n2. \`\`${prefix}help\`\`\n\n__**SETUP COMMANDS**__\n1. \`\`${prefix}setchannel\`\``).then(msg => {
			setTimeout(() => msg.delete(), msgsec * 2000);
		});
	},
};