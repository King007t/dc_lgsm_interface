const { exec } = require('child_process');
const { serverpath, msgsec } = require('../config.json');

module.exports = {
   name: 'update',
   description: 'Updates the LinuxGSM server to the latest version',
   execute(message, args) {
      message.channel.send("Updating the server! :sparkles:").then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
      
      const script = exec(serverpath + ' update');

      script.stdout.on('data', data => {
         console.log(data);
      });

      script.stderr.on('data', data => {
         console.error(data);
      });
   },
};