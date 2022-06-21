const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setName('sendu')
    .setDescription('Sendu eldonaĵon per la roboto')
    .addStringOption((eblo) => eblo
      .setName('teksto')
      .setDescription('Skribu priskribon de la eldonaĵo'))
    .addAttachmentOption((eblo) => eblo
      .setName('eldonajxo')
      .setDescription('Elŝutu eldonaĵon')),

  async execute(interaction) {
    const eblo = interaction.options;
    const cxiKanalo = interaction.channel;
    // Obtenu la eblojn
    const eldonajxo = eblo.getAttachment('eldonajxo');
    const teksto = eblo.getString('teksto');

    // Se la ebloj estis enmetataj, sendu ilin al la kanalo
    if (eldonajxo !== null) cxiKanalo.send(eldonajxo.url);
    cxiKanalo.send(teksto);

    // sendu kaj forigu mesaĝon
    interaction.deferReply();
    await wait(2000);
    interaction.deleteReply();
  },
};
