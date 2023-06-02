const { exec } = require('child_process');
const { serverpath, msgsec } = require('../config.json');

module.exports = {
   name: 'backup',
   description: 'Backs up the LinuxGSM server',
   execute(message, args) {
      message.channel.send("Backing up the server! :package:").then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
      
      const script = exec(serverpath + ' backup');

      script.stdout.on('data', data => {
         console.log(data);
      });

      script.stderr.on('data', data => {
         console.error(data);
      });
   },
};