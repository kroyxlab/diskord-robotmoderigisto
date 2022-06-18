const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setName('sendu')
    .setDescription('Sendu mesaĝojn per la roboto')
    .addStringOption((eblo) => eblo
      .setName('teksto')
      .setDescription('Sendu tekstan mesaĝon'))
    .addAttachmentOption((eblo) => eblo
      .setName('eldonajxo')
      .setDescription('Elŝutu dosieron')),

  async execute(interaction) {
    const eblo = interaction.options;
    const cxiKanalo = interaction.channel;
    // Obtenu la eblojn
    const teksto = eblo.getString('teksto');
    const eldonajxo = eblo.getAttachment('eldonajxo');

    // Se la ebloj estis enmetataj, sendu ilin al la kanalo
    if (teksto !== null) cxiKanalo.send(teksto);
    if (eldonajxo !== null) cxiKanalo.send(eldonajxo.url);

    // sendu kaj forigu mesaĝon
    interaction.reply('...');
    interaction.deleteReply();
  },
};
