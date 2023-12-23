const { exec } = require('child_process');
const fs = require('fs');
const config = require("../config.json");

module.exports = {
	name: 'info',
	description: 'Prints info about the LinuxGSM server',
	execute(message, args) {
		config.locked = true;
      
		fs.writeFile(__dirname.replace('commands', '') + "config.json", JSON.stringify(config), function writeJSON(err) {
    			if (err) return console.log(err);
    		});

		const script = exec(config.serverpath + ' details');
		var boolean = false;
    		var erroutput = "\n**Error:**``";

		var ip = "none";
		var uptime = "none";
		var status = "none";
		
  	    	script.stdout.on('data', data => {
			console.log(data);

			if(ip == "none" && data.includes("Internet IP:")) {
				var array = data.split("\n");

				for (let i = 0; i < array.length; i++) {
  					if (array[i].includes("Internet IP:")) {
						ip = array[i].replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
						break;
					}
				}
				ip = ip.replace(" ", "");
				ip = ip.replace(":", ": ");
			}

			if(uptime == "none" && data.includes("Uptime:")) {
				var array = data.split("\n");

				for (let i = 0; i < array.length; i++) {
  					if (array[i].includes("Uptime:")) {
						uptime = array[i].replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
						break;
					}
				}
				uptime = uptime.replace(" ", "");
				uptime = uptime.replace(":", ": ");
			}

			if(data.includes("STOPPED") || data.includes("STARTED")) {
				status = data.includes("STARTED") ? "Status: ONLINE" : "Status: OFFLINE";
			}
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
		 		message.channel.send({
					embed: {
						color: status.includes("ONLINE") ? 5763719 : 15548997,
						title: `${config.server_name}`,
						fields: [{ name: "Networking Info", value: ip},
							{ name: "General Info", value: uptime + "\n" + status}]
				}}).then(msg => {
					setTimeout(() => msg.delete(), config.msgsec * 2000);
            			});
			}
		});
	},
};