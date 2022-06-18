const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setName('forigu')
    .setDescription('Forigi ĝis 99 mesaĝojn po fojo')
    .addIntegerOption((eblo) => eblo
      .setName('kvanto')
      .setDescription('Kvanto da mesaĝoj por forigi')),

  async execute(interaction) {
    const cxiKanalo = interaction.channel;
    const eblo = interaction.options;

    // Obtenu la kvanton da mesaĝoj forigotaj
    const kvanto = eblo.getInteger('kvanto');

    if (kvanto < 1 || kvanto > 100) {
      return interaction.reply({
        content: 'Oni bezonas enmeti nombron inter 1 kaj 99',
        ephemeral: true,
      });
    }

    // Forigu la mesaĝojn
    await cxiKanalo
      .bulkDelete(kvanto, true)
      .catch((eraro) => {
        console.log(eraro);
        interaction.reply({
          content: 'Eraro okazis dum la forigado de la mesaĝoj en ĉi tiu kanalo',
          ephemeral: true,
        });
      });

    // Sendu la mesaĝon
    return interaction.reply({
      content: `${kvanto} mesaĝoj sukcese forigitaj`,
      ephemeral: true,
    });
  },
};
