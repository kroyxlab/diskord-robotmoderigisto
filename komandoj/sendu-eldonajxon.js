const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setName('sendu-eldonajxon')
    .setDescription('Sendu eldonaĵon per la roboto')
    .addAttachmentOption((eblo) => eblo
      .setName('eldonajxo')
      .setDescription('Elŝutu eldonaĵon')
      .setRequired(true))
    .addStringOption((eblo) => eblo
      .setName('priskribo')
      .setDescription('Skribu priskribon de la eldonaĵo')),

  async execute(interaction) {
    const eblo = interaction.options;
    const cxiKanalo = interaction.channel;
    // Obtenu la eblojn
    const eldonajxo = eblo.getAttachment('eldonajxo');
    const priskribo = eblo.getString('priskribo');

    // Se la ebloj estis enmetataj, sendu ilin al la kanalo
    cxiKanalo.send(eldonajxo.url);
    if (priskribo !== null) cxiKanalo.send(priskribo);

    // sendu kaj forigu mesaĝon
    interaction.deferReply();
    await wait(2000);
    interaction.deleteReply();
  },
};
