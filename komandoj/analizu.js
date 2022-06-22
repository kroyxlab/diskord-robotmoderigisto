const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { analizu } = require('../utilajxoj/simpla-vortaro');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('analizu')
    .setDescription('Analizu la vorton kaj montru al vi la parterojn de la vorto')
    .addStringOption((eblo) => eblo
      .setName('vorto')
      .setDescription('Vorto, kiun vi volas analizi')
      .setRequired(true)),

  async execute(interaction) {
    const eblo = interaction.options;
    // Obtenu la vorton enmetitan
    const vorto = eblo.getString('vorto').toLowerCase();

    // Serĉu la vorton en la API de simplavortaro
    const sercxo = await analizu(vorto);

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
    let vortfarado = sercxo.rezulto;
    let partoj = sercxo.partoj.map((parto) => {
      return {
        name: parto,
        value: `[http://www.simplavortaro.org/vorto/${parto}](http:www.simplavortaro.org/vorto/${parto})`,
        inline: false,
      };
    });

    // Preparu la mesaĝon liverigotan
    const respondo = new MessageEmbed()
      .setColor('#42b983')
      .setTitle(vorto.toUpperCase())
      .setDescription(vortfarado)
      .addFields(partoj);

    const butono = new MessageActionRow()
      .addComponents(
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
