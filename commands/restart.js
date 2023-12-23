const { exec } = require('child_process');
const fs = require('fs');
const config = require("../config.json");

module.exports = {
	name: 'restart',
   	description: 'Restarts the LinuxGSM server',
   	execute(message, args) {
		config.locked = true;
      
		fs.writeFile(__dirname.replace('commands', '') + "config.json", JSON.stringify(config), function writeJSON(err) {
    			if (err) return console.log(err);
    		});

      		message.channel.send("Restarting the server! Go grab a snack while you wait :meat_on_bone:").then(msg => {
               		setTimeout(() => msg.delete(), config.msgsec * 1000);
            	});
      
      		const script = exec(config.serverpath + ' restart');
      		var boolean = false;
    		var output = "\n**Output:**``";
    		var erroutput = "\n**Error:**``";

  	    	script.stdout.on('data', data => {
			console.log(data);
			output += data.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
   	   	});

		script.stderr.on('data', data => {
    			console.error(data);
			erroutput += data.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
		 	boolean = true;
   	   	});

		script.on('exit', function() {
			config.locked = false;
      
			fs.writeFile(__dirname.replace('commands', '') + "config.json", JSON.stringify(config), function writeJSON(err) {
    				if (err) return console.log(err);
    			});
		
			if(boolean) {
    				message.channel.send("An error has accured! Check the console output. :warning:  \n" + erroutput + "``").then(msg => {
					setTimeout(() => msg.delete(), config.msgsec * 1000);
    	        		});
			} else {
		 		message.channel.send("The command has been executed succesfully! :white_check_mark: \n" + output + "``").then(msg => {
 	      			setTimeout(() => msg.delete(), config.msgsec * 1000);
	        		});
			}
		});
	},
};