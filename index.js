require('dotenv').config(); //initialize dotenv
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, VoiceChannel, BaseChannel, ClientUser } = require('discord.js');
const { channel } = require('node:diagnostics_channel');
const { getVoiceConnection } = require('@discordjs/voice');

const { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } = require('discord.js'); 
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

 client.commands = new Collection();
 const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Choose your role')
					.addOptions(
						{
							label: 'Viking',
							description: 'The closest thing to absolute admin',
							value: 'first_option',
						},
						{
							label: 'Peasent',
							description: '...yeah',
							value: 'second_option',
						},
					),
			);

			const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Roles')
			.setURL('https://discord.js.org/')
			.setDescription('Select your role below for approval.');

		await interaction.reply({ content: 'Pong!', ephemeral: true, embeds: [embed], components: [row] });
	}
});
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'

client.once(Events.ClientReady, c => {
	client.guilds.fetch('1064796254988664842')
	.then(guilds => console.log(`Server Name: ${guilds.name}`));
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


botName = client.once(Events.ClientReady, c => {
	client.guilds.fetch('1064796254988664842')
	return (`Ready! Logged in as ${c.user.tag}`);
});

client.on('ready', async () => {
	const channel = await client.channels.fetch('1064796254988664845');
	channel.send(`Hello! My name is ${botName.user.username}! Welcome! I'm not smart right now but I will have more features soon!`)
	client.guilds.fetch('1064796254988664842')
	.then(guilds => channel.send(`Server Name: ${guilds.name}`));

});
  
function isChannelVoice() {
  client.on('ready', async () => {
	typeChannel = await client.channels.fetch('1064796254988664846');
	if (typeChannel.type === 2) {
		console.log("this is a voice channel")
	} else {
		console.log(typeChannel.type)
	}
	console.log(typeChannel.type);
  });
};



//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token