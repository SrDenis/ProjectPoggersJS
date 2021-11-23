module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        const client = interaction.client;

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Command failed', ephemeral: true });
        }
    }
}