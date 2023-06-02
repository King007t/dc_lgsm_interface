const { exec } = require('child_process');
const { serverpath, msgsec } = require('../config.json'); 

module.exports = {
   name: 'stop',
   description: 'Stops the LinuxGSM server',
   execute(message, args) {
      message.channel.send("Stopping the server! :octagonal_sign:").then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
      
      const script = exec(serverpath + ' stop');

      script.stdout.on('data', data => {
         console.log(data);
      });

      script.stderr.on('data', data => {
         console.error(data);
      });
   },
};