const { exec } = require('child_process');
const { serverpath, msgsec } = require('../config.json');

module.exports = {
   name: 'start',
   description: 'Starts the LinuxGSM server',
   execute(message, args) {
      message.channel.send("Starting the server! Get ready :crossed_swords:").then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
      
      const script = exec(serverpath + ' start');

      script.stdout.on('data', data => {
         console.log(data);
      });

      script.stderr.on('data', data => {
         console.error(data);
      });
   },
};