exports.run = function(Discord, msg) {
  const fs = require('fs')

  fs.readdir(`./assets/images/olaf`, { encoding: 'utf8' }, function(err, data) {
    if (err) {
      return console.log(new Date() + ` - ${err}`)
    } else {
      let file = data[Math.floor(Math.random() * data.length)]

      const attachment = new Discord.MessageAttachment(`./assets/images/olaf/${file}`)

      const embed = new Discord.MessageEmbed()
        .attachFiles(attachment)
        .setImage(`attachment://${file}`)
        .setColor('#E1E1E1')

      msg.channel.send(embed)
    }
  })
}

exports.name = "Olaf"
exports.command = "olaf"
exports.description = "{count} images & GIFs!"
