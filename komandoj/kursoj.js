const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { kursoj } = require('../utilajxoj/kursoj');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kursoj')
    .setDescription('Montru al vi liston de esperantaj kursoj'),

  async execute(interaction) {
    // Obtenu la kursojn
    const kursokampoj = kursoj.map((kurso) => (
      {
        name: kurso.nomo,
        value: `[${kurso.url}](${kurso.url})`,
        inline: false,
      }
    ));

    // Preparu la enkorpigon
    const respondo = new MessageEmbed()
      .setColor('#42B983')
      .setTitle('Listo de esperantaj kursoj')
      .addFields(kursokampoj);

    // Sendu la mesaĝon
    return interaction.reply({
      embeds: [respondo],
    });
  },
};
