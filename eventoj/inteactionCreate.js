module.exports = {
  name: 'interactionCreate',

  async execute(interaction) {
    if (interaction.isCommand()) {
      console.log(`${interaction.user.tag} en #${interaction.channel.name} ekagigis la komandon ${interaction.commandName}`);

      const komando = interaction.client.commands.get(interaction.commandName);

      if (komando) {
        try {
          komando.execute(interaction);
        } catch (error) {
          console.error(error);
          interaction.reply({
            content: 'Okazis eraro kiam la komando estis ekagigita',
            ephemeral: true,
          });
        }
      }
    }
  },
};
