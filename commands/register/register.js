const { MessageEmbed, Permissions } = require("discord.js");
const db = require("../../database/database.json");

module.exports = {
  name: "register",
  description: "Replies with register!",
  execute: async (message, args, client) => {
    const string = args.join(" ");

    if (!db.channel || !db.role) {
      const embed = new MessageEmbed()
        .setColor(client.color.red)
        .setTitle(`${client.emoji.error} • Error`)
        .setDescription(
          `>>> ${message.author}, **Please fill in channel id & role id in database file in database folder!**`
        )
        .setFooter({
          text: "Copyright by Syahril Official",
          iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1200px-Copyright.svg.png",
        });

      return await message.reply({ embeds: [embed] });
    }

    if (message.channel.id != db.channel) {
      const embed = new MessageEmbed()
        .setColor(client.color.red)
        .setTitle(`${client.emoji.error} • Error`)
        .setDescription(`>>> ${message.author}, **You can't use this command except in <#${db.channel}>**`)
        .setFooter({
          text: "Copyright by Syahril Official",
          iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1200px-Copyright.svg.png",
        });

      return await message.reply({ embeds: [embed] });
    }

    if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      const embed = new MessageEmbed()
        .setColor(client.color.red)
        .setTitle(`${client.emoji.error} • Error`)
        .setDescription(`>>> ${message.author}, **You can't use this command because you are the administrator!**`)
        .setFooter({
          text: "Copyright by Syahril Official",
          iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1200px-Copyright.svg.png",
        });

      return await message.reply({ embeds: [embed] });
    }

    if (!string) {
      const embed = new MessageEmbed()
        .setColor(client.color.red)
        .setTitle(`${client.emoji.error} • Error`)
        .setDescription(`>>> ${message.author}, **Please enter your name which you want to use!**`)
        .setFooter({
          text: "Copyright by Syahril Official",
          iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1200px-Copyright.svg.png",
        });

      return await message.reply({ embeds: [embed] });
    }

    if (string.length > 32) {
      const embed = new MessageEmbed()
        .setColor(client.color.red)
        .setTitle(`${client.emoji.error} • Error`)
        .setDescription(`>>> ${message.author}, **You can't enter a name up to 32 words!**`)
        .setFooter({
          text: "Copyright by Syahril Official",
          iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1200px-Copyright.svg.png",
        });

      return await message.reply({ embeds: [embed] });
    }

    const embed = new MessageEmbed()
      .setColor(client.color.green)
      .setTitle(`${client.emoji.success} • Success`)
      .setDescription(`>>> ${message.author}, **You have been verified on the ${message.guild.name} server**`)
      .setTimestamp()
      .setFooter({
        text: "Copyright by Syahril Official",
        iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1200px-Copyright.svg.png",
      });

    try {
      if (!db.roleremove) {
        await message.member.roles.add(`${db.role}`);
        if (db.tag) {
          await message.member.setNickname(`${db.tag} ${string}`);
        } else {
          await message.member.setNickname(`${string}`);
        }
        return await message.reply({ embeds: [embed] });
      } else if (!db.tag) {
        await message.member.roles.add(`${db.role}`);
        if (db.roleremove) {
          await message.member.roles.remove(`${db.roleremove}`);
        }
        await message.member.setNickname(`${string}`);
        return await message.reply({ embeds: [embed] });
      } else {
        await message.member.roles.add(`${db.role}`);
        await message.member.roles.remove(`${db.roleremove}`);
        await message.member.setNickname(`${db.tag} ${string}`);
        return await message.reply({ embeds: [embed] });
      }
    } catch (e) {
      return console.error(e);
    }
  },
};
