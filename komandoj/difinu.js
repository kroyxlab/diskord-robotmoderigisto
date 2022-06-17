const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { difinu } = require('../utilajxoj/simpla-vortaro');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('difinu')
    .setDescription('Donu al vi la difinon de la vorto')
    .addStringOption((eblo) => eblo
      .setName('vorto')
      .setDescription('Vorto, kiun vi volas serĉi')
      .setRequired(true)),

  async execute(interacion) {
    const eblo = interacion.options;
    const vorto = eblo.getString('vorto').toLowerCase();

    const sercxo = await difinu(vorto);

    if (sercxo === 'eraro') {
      const respondo = new MessageEmbed()
        .setColor('RED')
        .setTitle(vorto.toUpperCase())
        .setDescription(`La vorto ${vorto} ne estis trovata.`);

      await interacion.reply({
        embeds: [respondo],
        ephemeral: true,
      });

      return -1;
    }

    const respondo = new MessageEmbed()
      .setColor('#42B983')
      .setTitle(vorto.toUpperCase())
      .setURL(`http://www.simplavortaro.org/vorto/${vorto}`)
      .setDescription(sercxo);

    const butono = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('LINK')
          .setURL(`http://www.simplavortaro.org/vorto/${vorto}`)
          .setLabel(`Legu pli pri la vorto ${vorto.toUpperCase()}`));

    return interacion.reply({
      embeds: [respondo],
      components: [butono],
      ephemeral: true,
    });
  },
};
