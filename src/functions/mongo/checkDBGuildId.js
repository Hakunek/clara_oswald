const chalk = require("chalk");
const { getGuilds } = require("../../functions/tools/getGuilds");
const { createNewDBEntry } = require("../../functions/mongo/createNewDBEntry");
const {
  checkDBFindGuildID,
} = require("../../functions/mongo/checkDBFindGuildID");

async function checkDBGuildId(client) {
  let guildConfigurations = await getGuilds(client);
  for (const guild of guildConfigurations) {
    console.log(
      chalk.cyan(`[Database Check] Trying to resolve : guildId(${guild})...`)
    );
    let guildProfile = await checkDBFindGuildID(guild);
    if (!guildProfile) {
      console.log(
        chalk.yellow(`[Database Check] Warning : no entry with ${guild}`)
      );
      console.log(
        chalk.cyan(`[Database Check] : Creating new entry with ${guild}`)
      );
      console.log(
        chalk.green(`[Database Check] : New entry successfully create with :`)
      );
      await createNewDBEntry(guildProfile, guild, client);
    }
    console.log(chalk.green(`[Database Check] Found : (${guild})`));
  }
}
module.exports = { checkDBGuildId };