const { REST, Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');
const botSettings = require('./botSettings.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(botSettings.token);

// and deploy your commands!
(async () => {
	try {
		// remove commands
		// per guild
		// const removeCommands = await rest.put(Routes.applicationGuildCommands(botSettings.clientId, botSettings.testGuildId), { body: [] })
		// .then(() => console.log('Successfully deleted all guild commands.'))
		// .catch(console.error);		

		// all guilds
		// rest.put(Routes.applicationCommands(clientId), { body: [] })
		// 	.then(() => console.log('Successfully deleted all application commands.'))
		// 	.catch(console.error);		

		// register commands
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			// Routes.applicationGuildCommands(botSettings.clientId, botSettings.testGuildId), // use for test guild
            Routes.applicationCommands(botSettings.clientId), // use for all guilds
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
