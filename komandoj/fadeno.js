const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setName('fadeno')
    .setDescription('Kreu aktivaĵojn')
    .addStringOption((eblo) => eblo
      .setName('titolo')
      .setDescription('Titolo de la fadeno')
      .setRequired(true))
    .addStringOption((eblo) => eblo
      .setName('enhavo')
      .setDescription('La unua mesaĝo en la fadeno')
      .setRequired(true))
    .addAttachmentOption((eblo) => eblo
      .setName('attachment')
      .setDescription('Elektu la bildon por montri en la fadeno')),

  async execute(interaction) {
    const kanalo = interaction.channel;
    const eblo = interaction.options;

    // Obtenu la datumojn enmetitajn
    const titolo = eblo.getString('titolo');
    const enhavo = eblo.getString('enhavo');
    const attachment = eblo.getAttachment('attachment');

    // Kreu la fadenon
    kanalo.threads.create({
      name: titolo,
      autoArchiveDuration: 60 * 24,
      type: 'GUILD_PUBLIC_THREAD',
    }).then((thread) => {
      if (attachment !== null) thread.send(attachment.url);
      thread.send(enhavo);
    });

    // Sendu la mesaĝon
    return interaction.reply({
      content: 'La fadeno estis kreata',
      ephemeral: true,
    });
  },
};
