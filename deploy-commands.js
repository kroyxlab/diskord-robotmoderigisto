const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

dotenv.config();

// Obtenu la dosierojn de la komandoj
const komandoj = [];
const komandajDosieroj = fs
  .readdirSync('./komandoj')
  .filter((dosiero) => dosiero.endsWith('.js'));

// Obtenu la datumojn po dosiero
komandajDosieroj.forEach((dosiero) => {
  const komando = require(`./komandoj/${dosiero}`);
  komandoj.push(komando.data.toJSON());
});

// Registru la komandojn
const rest = new REST({ version: '9' }).setToken(process.env.BOTTOKEN);
rest.put(
  Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
  { body: komandoj }
)
  .then(() => console.log('Aplikaj komandoj sukcese registritaj'))
  .catch(console.error);
