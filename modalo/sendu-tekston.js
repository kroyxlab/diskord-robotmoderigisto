const wait = require('node:timers/promises').setTimeout;

module.exports = {
  async execute(interaction) {
    const cxiKanalo = interaction.channel;
    const mesagxo = interaction.fields.getTextInputValue('mesagxo');

    interaction.deferReply();
    cxiKanalo.send(mesagxo);
    await wait(2000);
    interaction.deleteReply();
  },
};
