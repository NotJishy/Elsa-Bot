exports.run = function(Discord, msg) {
  if (msg.mentions.members.first()) {
    const messages = ["{victim} was snowballed in the face by {criminal}!", "{criminal} has pelted {victim} in the face with a snowball!", "{victim} was thrown into the void with a snowball by {criminal}"]

    const attachment = new Discord.MessageAttachment(`./assets/images/anna/snowball.gif`)

    const embed = new Discord.MessageEmbed()
      .attachFiles(attachment)
      .setImage(`attachment://snowball.gif`)
      .setColor("#E1E1E1")
      .setDescription(messages[Math.floor(Math.random() * messages.length)].replace('{victim}', msg.mentions.members.first()).replace('{criminal}', msg.author))

    msg.channel.send(embed)
  } else {
    msg.reply('You need to tag someone to throw the snowball at!')
  }
}

exports.name = "Snowball"
exports.command = "snowball <user>"
exports.description = "Throw a snowball at a friend!"
