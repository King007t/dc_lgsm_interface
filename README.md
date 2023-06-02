# Discord_LinuxGSM_interface | Control your LinuxGSM server from Discord

A Discord bot that let's you start, stop, restart etc. a LinuxGSM server. It's basically just a way to access the LinuxGSM (Linux Game Server Managers) scripts trough Discord.

## Requirements
This bot relies on your GameServer being installed using [LinuxGSM_](https://linuxgsm.com). The bot uses LGSM scripts to execute it's commands.

You also need NodeJS and NPM installed.
# Installation
_NOTE! Make sure you're doing this as the user with the LinuxGSM installation.

1 Start by cloning the repository and installing the packages
```
git clone https://github.com/King007t/Discord_LinuxGSM_interface.git
cd Discord_LinuxGSM_interface
npm install
```
2 to be able to connect to a Discord server you will need a bot token.
[Here's a guide](#0) on how to get a token. Store your token as a string called `token` inside `config.json`. Fill out the rest of your config file too. 

Your config file (config.json) will look something like this:
```
{
	"server_name": "MyServer",		//name of the server
	"serverpath": "/home/[user]/arkserver",	//path to LinuxGSM installation
	"msgsec": "5",				//seconds a message from the bot will be displayed
	"prefix": "!",				//prefix for recognition of bot commands
	"token": "random_characters",		//discord bot token to connect to		
	"channel" :"",				//can be left blank (can be added by sending the **setchannel** command into the desired channel)
	"required_role" : {
		"use": true,			//true or false defines if a role is required to use the bot
		"name": "ServerManager"		//name of the required role
	}
}
```

3 Start the bot by running the following command within the Discord_LinuxGSM_interface directory
```
node bot.js
```
**OR** Make the bot run in the background and on sytem startup by creating a sytemd service

Step 1: Create a new systemd service for Discord_LinuxGSM_interface
```
sudo nano /lib/systemd/system/Discord_LinuxGSM_interface.service 
```

Step 2: Paste the following content and replace User and Group with your own username
```
[Unit]
Description=Discord_LinuxGSM_interface
[Service]
Type=simple
Restart=on-failure
RestartSec=5
StartLimitInterval=60s
StartLimitBurst=3
User=[username]
Group=[username]
ExecStart=node /home/[username]/Discord_LinuxGSM_interface/
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s TERM $MAINPID
[Install]
WantedBy=multi-user.target
```

Step 3: Press Ctrl + x,y (to save), Enter (to save with the same name)

Step 4: Enable the new Discord_LinuxGSM_interface service (optional but will make the bot start on boot)
```
sudo systemctl enable Discord_LinuxGSM_interface.service
```

Step 5: Reload the Systemd Daemon (Do this every time you modify a server file)
```
sudo systemctl daemon-reload
```

Step 6: start the Discord_LinuxGSM_interface service. You can use start, stop, restart or status. You don't have to run it manually again if it's enabled to start on boot (Step 4).
```
sudo systemctl start Discord_LinuxGSM_interface.service
```

## Available commands
_NOTE! The default prefix is !. The prefix must be used before the command for it to work._

MANAGEMENT COMMANDS
* **start**
* **stop**
* **restart**
* **backup**
* **update**
* **force-update**

INFO COMMANDS
* **info** - info about the server
* **help** - will give you a list of all available commands

SETUP COMMANDS
* **setchannel** - will set bot command channel to current channel
