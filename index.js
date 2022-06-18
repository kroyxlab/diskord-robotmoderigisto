const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// Agordu la klienton
const kliento = new Client({ intents: [Intents.FLAGS.GUILDS] });

kliento.commands = new Collection();

// traktado de la komandoj
const komandajDosieroj = fs
  .readdirSync('./komandoj')
  .filter((dosiero) => dosiero.endsWith('.js'));

komandajDosieroj.forEach((dosiero) => {
  const komando = require(`./komandoj/${dosiero}`);
  kliento.commands.set(komando.data.name, komando);
});

// traktado de la eventoj
const eventajDosieroj = fs
  .readdirSync('./eventoj')
  .filter((dosiero) => dosiero.endsWith('.js'));

eventajDosieroj.forEach((dosiero) => {
  const evento = require(`./eventoj/${dosiero}`);

  if (evento.once) {
    kliento.once(evento.name, (...args) => evento.execute(...args));
  } else {
    kliento.on(evento.name, (...args) => evento.execute(...args));
  }
});

// Ensaluto de la kliento
kliento.login(process.env.BOTTOKEN);
