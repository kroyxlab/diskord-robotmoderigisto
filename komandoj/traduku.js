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

    // Obtenu la vorton enmetitan
    const vorto = eblo.getString('vorto').toLowerCase();

    // Serĉu la vorton
    const sercxo = await traduku(vorto);

    // Sendu erarmesaĝon se okazus eraro
    if (sercxo === 'eraro') {
      const respondo = new MessageEmbed()
        .setColor('RED')
        .setTitle(vorto.toUpperCase())
        .setDescription(`La vorto ${vorto} ne estis trovata`);

      await interaction.reply({
        embeds: [respondo],
        ephemeral: true,
      });

      return -1;
    }

    // Ricevu la rezulton de la serĉo
    const tradukaro = sercxo.map((traduko) => ({
      name: traduko.lingvo,
      value: traduko.traduko,
      inline: true,
    }));

    // Preparu la mesaĝon
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

    // Sendu la mesaĝon
    return interaction.reply({
      embeds: [respondo],
      components: [butono],
      ephemeral: true,
    });
  },
};
