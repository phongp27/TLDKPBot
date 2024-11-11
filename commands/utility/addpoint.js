const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const path = require("node:path");

const rootDir = process.cwd();

const userFilePath = path.join(rootDir, "user.json");

// Load existing user data from user.json
function loadUserData() {
  if (fs.existsSync(userFilePath)) {
    const rawData = fs.readFileSync(userFilePath);
    return JSON.parse(rawData);
  }
  return {};
}

// Save user data to user.json
const saveUserData = (userData) => {
  fs.writeFileSync(userFilePath, JSON.stringify(userData, null, 2));
};

// Update user value
const updateUserValue = (name) => {
  const userData = loadUserData();

  if (!userData[name]) {
    userData[name] = 1;
  } else {
    userData[name] += 1;
  }

  saveUserData(userData);
  return userData[name];
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addpoint")
    .setDescription("Manages user values")
    .addStringOption((option) =>
      option
        .setName("users")
        .setDescription(
          "Comma-separated list of usernames or nicknames to update"
        )
        .setRequired(true)
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

    const usersString = interaction.options.getString("users");
    const userMentions = usersString
      .trim()
      .replace(/[<@!>]/g, "")
      .split(/\s*,\s*|\s+/); // Split string by commas

    const nicknames = [];

    // Process each user mention
    for (const mention of userMentions) {
      const user = interaction.guild.members.cache.get(mention);

      if (user) {
        // Push the nickname or username to the array
        nicknames.push(user.nickname || user.user.globalName);
      }
    }

    if (nicknames.length === 0) {
      return interaction.reply(
        "There are no such users, you must use there @ tag"
      );
    }

    for (const members of nicknames) {
      updateUserValue(members);
    }

    // Send the nicknames back as a response
    await interaction.reply({
      content: `These users have there points updated: ${nicknames.join(", ")}`,
    });
  },
};
