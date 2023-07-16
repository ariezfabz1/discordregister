const fs = require("fs");
const config = require("../../config/config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Replies with ping!",
  execute: async (message, args, client) => {
    if (!args[0]) {
      let categories = [];

      fs.readdirSync("./commands/").forEach((dir) => {
        const editedName = `${dir.toUpperCase()}`;
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: editedName,
          value: cmds.length === 0 ? "`In progress.`" : cmds.join(" "),
        };

        return categories.push(data);
      });

      const embed = new MessageEmbed()
        .setColor(client.color.blue)
        .setTitle("📬 Need help? Here are all of my commands:")

        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `>>> Use \`${config.prefix}help\` followed by a command name to get more additional information on a command. For example: \`${config.prefix}help ping\`.`
        )
        .addFields(categories)
        .setTimestamp()
        .setFooter({
          text: "Copyright by Syahril Official",
          iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1200px-Copyright.svg.png",
        });

      try {
        return await message.reply({ embeds: [embed] });
      } catch (e) {
        return console.error(e);
      }
    } else {
      const command = client.commands.get(args[0].toLowerCase());

      if (!command) {
        const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("❌ • Error")
          .setDescription(`>>> Invalid command! Use \`${config.prefix}help\` for all of my commands!`);
        return await message.reply({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setColor(client.color.blue)
        .setTitle("Command Details:")
        .addField("PREFIX:", `>>> \`${config.prefix}\``)
        .addField("COMMAND:", command.name ? `>>> \`${command.name}\`` : ">>> `No name for this command.`")
        .addField(
          "USAGE:",
          command.usage
            ? `>>> \`${config.prefix}${command.name} ${command.usage}\``
            : `>>> \`${config.prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description ? `>>> \`${command.description}\`` : ">>> `No description for this command.`"
        )
        .setTimestamp()
        .setFooter({
          text: "Copyright by Syahril Official",
          iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1200px-Copyright.svg.png",
        });

      try {
        return await message.reply({ embeds: [embed] });
      } catch (e) {
        return console.log(e);
      }
    }
  },
};
