exports.run = function(Discord, msg) {
  const fs = require('fs')

  fs.readdir(`./assets/images/elsa`, { encoding: 'utf8' }, function(err, data) {
    if (err) {
      return console.log(new Date() + ` - ${err}`)
    } else {
      let file = data[Math.floor(Math.random() * data.length)]

      const attachment = new Discord.MessageAttachment(`./assets/images/elsa/${file}`)

      const embed = new Discord.MessageEmbed()
        .attachFiles(attachment)
        .setImage(`attachment://${file}`)
        .setColor('#40ccf6')

      msg.channel.send(embed)
    }
  })
}

exports.name = "Elsa"
exports.command = "elsa"
exports.description = "{count} images & GIFs!"
