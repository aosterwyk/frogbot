const fs = require('node:fs');
const path = require('node:path');
const botSettings = require('./botSettings.json');
const version = require('./package.json').version;
const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// https://discordapp.com/oauth2/authorize?client_id=<clientid>&scope=bot&permissions=378944 

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// commands
client.cooldowns = new Collection();
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.login(botSettings.token);

client.once('ready', async () => {
    console.log(`${client.user.username} connected`);
    if(botSettings.activity !== undefined) {
        client.user.setActivity( `${botSettings.activity} | ${version}`, {type: ActivityType.Watching});
    }
});

client.on(Events.InteractionCreate, async interaction => {

    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    const { cooldowns } = client;
    if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;    

    if(!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1000);
            return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
        }
    }
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);    

    try { await command.execute(interaction); }
    catch(error) {
        console.error(error);
        if(interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        else { await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); }
    }
});

