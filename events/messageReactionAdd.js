/*eslint-env node*/

const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();

module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user) {

        const message = reaction.message;

        if (message.partial) await message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!message.guild) return;

        if (message.channel.id != process.env.albumChannelId) return;

        if (!(message.attachments.size || message.embeds.size)) return;


        if (reaction.emoji.name === '💩' && reaction.count == 1) {

            message.channel.send(content = `${message.author}\n Que feio hein!`);

            // Totalmente inseguro, mas funciona - Autopilot 2021

            const filename = message.attachments.first().name;
            await fetch(message.attachments.first().url).then(res => res.body.pipe(fs.createWriteStream(`./albums/${filename}`)));

            // Encontra o webhook do canal de capas
            const badChannel = await message.guild.channels.cache.find(channel => channel.id === process.env.badAlbumChannelId);
            const webhooks = await badChannel.fetchWebhooks();
            const webhook = webhooks.first();

            await webhook.send({
                username: user.username,
                avatarURL: user.displayAvatarURL(),
                files: [{
                    attachment: `./albums/${filename}`,
                    name: `${filename}`
                }]
            });

            // Deleta imagem e mensagem
            fs.unlinkSync(`./albums/${filename}`);

            message.delete()
                .then(msg => console.log(`Deletado mensagem do ${msg.author.username}`))
                .catch(console.error);

        }
    }

}

