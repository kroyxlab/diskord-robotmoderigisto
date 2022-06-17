module.exports = {
  name: 'ready',
  once: true,

  async execute(client) {
    console.log(`Pretas! Ensalutas kiel ${client.user.tag}`);;

    if (!client.application?.owner) await client.application?.fetch();

    // const guilds = client.guilds.cache.map((guild) => guild);
    // const komandaro = await guilds[0].commands.fetch();
  },
};
