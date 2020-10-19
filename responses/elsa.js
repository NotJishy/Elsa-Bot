exports.run = function(Discord, msg) {
  const fs = require('fs')

  fs.readFile(`./guilds/${msg.guild.id}.json`, { encoding: 'utf8' }, function(err, data) {
    if (err) {
      return console.log(new Date() + ` - ${err}`)
    } else {
      let toggle = JSON.parse(data)

      if (toggle.respond) {
        fs.readdir(`./assets/elsa`, { encoding: 'utf8' }, function(err, data) {
          if (err) {
            return console.log(new Date() + ` - ${err}`)
          } else {
            let file = data[Math.floor(Math.random() * data.length)]

            const attachment = new Discord.MessageAttachment(`./assets/elsa/${file}`)

            msg.channel.send(attachment)
          }
        })
      }
    }
  })
}
