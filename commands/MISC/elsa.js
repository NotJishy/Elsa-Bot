exports.run = function(Discord, msg) {
  const fs = require('fs')

  fs.readdir(`./assets/elsa`, { encoding: 'utf8' }, function(err, data) {
    if (err) {
      return console.log(new Date() + ` - ${err}`)
    } else {
      let file = data[Math.floor(Math.random() * data.length)]

      const attachment = new Discord.MessageAttachment(`./assets/images/elsa/${file}`)

      msg.channel.send(attachment)
    }
  })
}
