const { server_name, msgsec } = require('../config.json');

module.exports = {
   name: 'info',
   description: 'Prints info about the LinuxGSM server',
   execute(message, args) {
      message.channel.send({
         embed: {
            color: 3447003,
            title: `${server_name}`,
            fields: [
               { name: "IP", value: "0.0.0.0" },
               { name: "Status", value: "Online/Offline"},
               { name: "Players", value: "X / 10" },
               { name: "Uptime", value: "10hours 43minutes"}
            ]
         }
      }).then(msg => {
               setTimeout(() => msg.delete(), msgsec * 1000);
            });
   },
};