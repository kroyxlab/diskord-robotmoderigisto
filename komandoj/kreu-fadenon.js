const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kreu-fadenon')
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
    const titolo = eblo.getString('titolo');
    const enhavo = eblo.getString('enhavo');
    const attachment = eblo.getAttachment('attachment');

    kanalo.threads.create({
      name: titolo,
      autoArchiveDuration: 60,
      type: 'GUILD_PUBLIC_THREAD',
    }).then((thread) => {
      if (attachment !== null) thread.send(attachment.url);
      thread.send(enhavo);
    });

    interaction.reply({
      content: 'La fadeno estis kreata',
      ephemeral: true,
    });
    // const msj = interaction.reply('hola');
    // msj.startThread({
    //  name: 'Holaaaa',
    //  autoArchiveDuration: 60,
    //  type: 'GUILD_PUBLIC_THREAD'
    // })
  },
};
