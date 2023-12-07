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