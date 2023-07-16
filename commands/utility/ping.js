const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Replies with ping!",
  execute: async (message, args, client) => {
    const embed = new MessageEmbed()
      .setColor(client.color.blue)
      .setDescription(`>>> ${client.emoji.pong} **Websocket**: \`${client.ws.ping}\` **ms!**`)
      .setFooter({
        text: "Copyright by Syahril Official",
        iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Copyright.svg/1200px-Copyright.svg.png",
      });

    try {
      return await message.reply({
        embeds: [embed],
      });
    } catch (e) {
      return console.error(e);
    }
  },
};
