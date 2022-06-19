const { SlashCommandBuilder } = require ('@discordjs/builders');
const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setName('sendu-tekston')
    .setDescription('Sendu tekston'),

  async execute(interaction) {
    // Kreu modalon
    const modalo = new Modal()
      .setCustomId('sendu-tekston')
      .setTitle('Sendu tekston');

    // Preparu la mesaĝon sendotan
    const mesagxo = new TextInputComponent()
      .setCustomId('mesagxo')
      .setLabel('Mesaĝo:')
      .setStyle('PARAGRAPH');

    const teksto = new MessageActionRow().addComponents(mesagxo);

    modalo.addComponents(teksto);

    // Montru la modalon
    await interaction.showModal(modalo);
  },
};
