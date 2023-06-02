const { exec } = require('child_process');
const { serverpath, msgsec } = require('../config.json');

module.exports = {
   name: 'restart',
   description: 'Restarts the LinuxGSM server',
   execute(message, args) {
      message.channel.send("Restarting the server! Go grab a snack while you wait :meat_on_bone:").then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
      
      const script = exec(serverpath + ' restart');

      script.stdout.on('data', data => {
         console.log(data);
      });

      script.stderr.on('data', data => {
         console.error(data);
      });
   },
};