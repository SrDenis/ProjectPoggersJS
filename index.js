/*eslint-env node*/

const { Client, Intents, Collection } = require('discord.js');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();


// New client
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});


// Handlers

client.commands = new Collection();
client.events = new Collection();


['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
})


// Login discord

client.login(process.env.TOKEN);