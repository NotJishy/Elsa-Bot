exports.run = function (Discord, msg, args) {
  var fs = require('fs')
  const hugs = fs.readdirSync('./assets/hugs')

  if (!args[0]) {
    msg.reply(`You need to tell me who you want to hug!`)
  } else {
    let gif = hugs[Math.floor(Math.random() * hugs.length)]

    const embed = new Discord.MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setDescription(`${msg.author} hugged ${msg.mentions.members.first()}`)
      .setColor(`AQUA`)
      .attachFiles([`./assets/hugs/${gif}`])
      .setImage(`attachment://${gif}`)

    msg.channel.send(embed)
  }
}

exports.name = "Hugs"
exports.command = "hug <user>"
exports.description = "Hug someone else with a hugging gif from Frozen!"
