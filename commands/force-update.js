const { exec } = require('child_process');
const { serverpath, msgsec } = require('../config.json');

module.exports = {
   name: 'force-update',
   description: `Updates the LinuxGSM server without checking if there's a new version`,
   execute(message, args) {
      message.channel.send("Forcing an update of the server! :desktop: :punch:").then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
      
      const script = exec(serverpath + ' force-update');

      script.stdout.on('data', data => {
         console.log(data);
      });

      script.stderr.on('data', data => {
         console.error(data);
      });
   },
};