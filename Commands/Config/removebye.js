const Discord = module.require("discord.js")
const prefixModel = require("../Owner/models/bye");

module.exports = {
  name: "setbye",
  description: "Change the goodbye channel per server!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("You don't have enough Permissions!")
    }
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    });

    if (data) {
      await prefixModel.findOneAndUpdate({
        State: "No",
        GuildID: message.guild.id
      });

      message.channel.send(`Goodbye Logs have been Stopped!`);

      let newData = new prefixModel({
        State: "No",
        GuildID: message.guild.id
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`Goodbye Channel set to ${message.mentions.channels.first()}`);

      let newData = new prefixModel({
        State: "No",
        GuildID: message.guild.id
      });
      newData.save();
    }
  }
}