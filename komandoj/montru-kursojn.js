const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { kursaro } = require('../utilajxoj/kursaro');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('montru-kursojn')
    .setDescription('Montru al vi listo de esperantaj kursoj'),

  async execute(interaction) {
    const kursojFields = kursaro.map((kurso) => (
      {
        name: kurso.nomo,
        value: `[${kurso.url}](${kurso.url})`,
        inline: false,
      }
    ));

    const cxefaRespondo = new MessageEmbed()
      .setColor('#42B983')
      .setTitle('Listo de esperantaj kursoj')
      .addFields(kursojFields);

    return interaction.reply({
      embeds: [cxefaRespondo],
    });
  },
};
