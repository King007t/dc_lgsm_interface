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
      var boolean = false;
      var output = "\n**Output:**``";
      var erroutput = "\n**Error:**``";

      script.stdout.on('data', data => {
	 console.error(data);
	 output += data;
      });

      script.stderr.on('data', data => {
         console.error(data);
	 erroutput += data;
	 boolean = true;
      });

      script.on('exit', function() {
	if(boolean) {
    	 message.channel.send("An error has accured! Check the console output. :warning:  \n" + erroutput + "``").then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
	} else {
	 message.channel.send("The command has been executed succesfully! :white_check_mark: \n" + output + "``").then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
	}});
   },
};