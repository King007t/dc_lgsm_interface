const { exec } = require('child_process');
const fs = require('fs');
const config = require("../config.json");

module.exports = {
   name: 'setchannel',
   description: 'sets the channel the bot will respond to',
   execute(message, args) {

    if(config.channel == message.channel.id){
        message.channel.send("Channel is already set to " + message.channel.name).then(msg => {
               setTimeout(() => msg.delete(), config.msgsec * 1000);
            });
    }
    else{
        
        config.channel = message.channel.id;

        fs.writeFile(__dirname.replace('commands', '') + "config.json", JSON.stringify(config), function writeJSON(err) {
          if (err) return console.log(err);
        });

        message.channel.send("Set channel to " + message.channel.name + " :speech_left:").then(msg => {
               setTimeout(() => msg.delete(), config.msgsec * 1000);
            });
    }
   },
};