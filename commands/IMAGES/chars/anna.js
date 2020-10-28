exports.run = function(Discord, msg) {
  const fs = require('fs')

  fs.readdir(`./assets/images/anna`, { encoding: 'utf8' }, function(err, data) {
    if (err) {
      return console.log(new Date() + ` - ${err}`)
    } else {
      let file = data[Math.floor(Math.random() * data.length)]

      const attachment = new Discord.MessageAttachment(`./assets/images/anna/${file}`)

      const embed = new Discord.MessageEmbed()
        .attachFiles(attachment)
        .setImage(`attachment://${file}`)
        .setColor('#19bf00')

      msg.channel.send(embed)
    }
  })
}

exports.name = "Anna"
exports.command = "anna"
exports.description = "{count} images and GIFs!"
