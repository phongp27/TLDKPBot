const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const path = require("node:path");

const rootDir = process.cwd();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("currentlist")
    .setDescription(
      "Gets the current list of users that has shown up to guild bosses"
    ),
  async execute(interaction) {
    const leadershipRole = interaction.guild.roles.cache.find(
      (role) => role.name === "Leadership"
    );

    if (!leadershipRole) {
      return interaction.reply(
        'The "Leadership" role does not exist in this server.'
      );
    }

    if (!interaction.member.roles.cache.has(leadershipRole.id)) {
      return interaction.reply(
        "You do not have the required role to use this command."
      );
    }
    try {
      // Read the JSON file asynchronously
      const data = fs.readFileSync(path.resolve(rootDir, "user.json"), "utf8");

      // Parse the JSON content
      const users = JSON.parse(data);

      // Create an array to hold the formatted strings
      const response = [];

      // Loop through each user and format it (capitalize the first letter of the keys)
      for (const [key, value] of Object.entries(users)) {
        response.push(`${key}: ${value}`);
      }

      const formattedResponse = response.join("\n");

      // Join the formatted data with newlines and send it back as the reply
      await interaction.reply(`\`\`\`${formattedResponse}\`\`\``);
    } catch (error) {
      console.error("Error reading or parsing the JSON file:", error);
      await interaction.reply("There was an error reading the users data.");
    }
  },
};
