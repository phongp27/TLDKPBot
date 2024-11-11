# Discord Bot for Throne and Liberty
This is a simple Discord bot designed for the game Throne and Liberty but can be expanded for other uses. Currently, the bot performs the following functions:

- Creates a user.json file to store user data.
- Allows users to add points to current Discord members.
- Prints out a list of users with their points.

## Features
- User Point Tracking: Keep track of points for each Discord user.
- Customizable: Easily extendable to include more features or adapt to other games and can be adapted to 

## Commands
/addpoint @discorduser - This command retrieves the users' nicknames or current Discord global names and appends them to the JSON file. You can add multiple names separated by spaces or commas. Note that you must use their @tags; otherwise, the command will not work. This requirement prevents redundant keys caused by case sensitivity.
/currentlist - this prints out a list to your discord server


# Requirements
- Use node v18 or higher
- Create a config.json list and have the follow contents below

```
{
  "token": "YOUR-DISCORD-BOT-TOKEN",
  "clientId": "YOUR-DISCORD-CLIENT-TOKEN",
  "guildId": "YOUR-SERVER-ID"
}
```

Have fun using it!
