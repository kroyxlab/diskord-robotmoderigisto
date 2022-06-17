const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { traduku } = require('../utilajxoj/simpla-vortaro');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('traduku')
    .setDescription('Traduku esperantan vorton al multaj lingvoj')
    .addStringOption((eblo) => eblo
      .setName('vorto')
      .setDescription('Skribu la esperantan vorton, kiu estos tradukata')
      .setRequired(true)),

  async execute(interaction) {
    const eblo = interaction.options;
    const vorto = eblo.getString('vorto').toLowerCase();

    const sercxo = await traduku(vorto);

    if (sercxo === 'eraro') {
      const respondo = new MessageEmbed()
        .setColor('red')
        .setTitle(vorto.toUpperCase())
        .setDescription(`La vorto ${vorto} ne estis trovata`);

      await interaction.reply({
        embeds: [respondo],
        ephemeral: true,
      });

      return -1;
    }

    const tradukaro = sercxo.map((traduko) => ({
      name: traduko.lingvo,
      value: traduko.traduko,
      inline: true,
    }));

    const respondo = new MessageEmbed()
      .setColor('#42b983')
      .setTitle(vorto.toUpperCase())
      .setURL(`http://www.simplavortaro.org/vorto/${vorto}`)
      .addFields(tradukaro);

    const butono = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle('LINK')
        .setURL(`http://www.simplavortaro.org/vorto/${vorto}`)
        .setLabel(`Legu pli pri la vorto ${vorto.toUpperCase()}`));

    return interaction.reply({
      embeds: [respondo],
      components: [butono],
      ephemeral: true,
    });
  },
};
