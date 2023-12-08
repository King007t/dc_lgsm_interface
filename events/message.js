const { prefix, required_role, msgsec } = require('../config.json');

module.exports = {
   name: 'message',
   execute(message, client) {
      if (!message.content.startsWith(prefix) || message.author.bot) return;
      message.delete();
      // If there's a required role, check that the user sending the command has that role
      if (required_role.use && !message.member.roles.cache.some(role => role.name === required_role.name)) {
         message.reply(`Sorry, you don't have the right privileges. You can ask a Staff member for help.`).then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
         return;
      }
      
      const { locked } = require("../config.json");
      
      if (locked) 
         message.reply(`Please wait for the previous command to execute! :warning:`).then(msg => {
            setTimeout(() => msg.delete(), msgsec * 1000);
         });
         return;
      
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      if (!client.commands.has(commandName)) 
         message.reply(`No command found. Use \`\`${prefix}help\`\` for available commands`).then(msg => {
            setTimeout(() => msg.delete(), msgsec * 1000);
         });
         return;
   
      if(commandName != "setchannel"){
         const { channel } = require("../config.json");
         if(message.channel.id != config.channel){
            message.reply(`Please use the correct channel`).then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
            return;
         }
      }

      try {
         client.commands.get(commandName).execute(message, args);
      } catch (error) {
         console.error(error);
         message.reply('There was an error trying to execute that command!').then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
      }
   }
};
