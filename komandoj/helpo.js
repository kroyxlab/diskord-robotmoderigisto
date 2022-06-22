const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('helpo')
    .setDescription('Montru kiel uzi la roboton'),

  async execute(interaction) {

    // kreu liston de komandoj
    const komandoj = [
      {
        name: '/difinu',
        value: 'Montras al vi la difinon de la vorto',
        inline: true,
      },
      {
        name: '/traduku',
        value: 'Montras al vi la tradukon de la vorto',
        inline: true,
      },
      {
        name: '/analizu',
        value: 'Montras al vi la vorton dividatan en siaj eroj',
        inline: true,
      },
      {
        name: '/kursoj',
        value: 'Montras al vi liston de esperantoj kursoj',
        inline: true,
      },
    ];

    // Preparu la respondon
    const respondo = new MessageEmbed()
      .setColor('#42b983')
      .setTitle('Helpo')
      .setURL('https://github.com/kroyxlab/diskord-robotmoderigisto')
      .addFields(komandoj);

    // Sendu la respondon
    return interaction.reply({
      embeds: [respondo],
      ephemeral: true,
    });
  },
};
