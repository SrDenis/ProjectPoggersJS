const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('hey')
        .setDescription('Dia 11'),

    async execute(interaction) {
        await interaction.reply('Hey Rockers!!');
    },

}