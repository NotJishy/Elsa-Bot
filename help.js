exports.get = function (Discord, msg, client, prefix, args) {
  var fs = require('fs')
  var dir = fs.readdirSync('./commands')

  var cat = null
  for (i = 0; i < dir.length; i++) {
    if (args[0] === (dir[i]).toString().toLowerCase()) {
      cat = dir[i]
    }
  }

  if (cat != null) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle(cat)
      .setColor("RANDOM")

      if (cat == 'IMAGES') {
        dir = fs.readdirSync(`./commands/${cat}/chars`, { withFileTypes: true })

        for (i = 0; i < dir.length; i++) {
          var cmd = require(`./commands/${cat}/chars/${dir[i].name}`)
          let imagesDir = fs.readdirSync(`./assets/images/${(dir[i].name).replace('.js', '')}`)

          embed.addField(`${(cmd.command).toUpperCase()}`, `\`${(cmd.description).replace('{count}', `${imagesDir.length}`)}\``, true)
        }

        embed.addField(`Kristoff`, 'COMING SOON!', true)
        embed.addField(`Honeymaren`, 'COMING SOON!', true)
      } else {
        dir = fs.readdirSync(`./commands/${cat}`, { withFileTypes: true })

        for (i = 0; i < dir.length; i++) {
          var cmd = require(`./commands/${cat}/${dir[i].name}`)

          embed.addField(`${(cmd.command).toUpperCase()}`, `\`${cmd.description}\``, true)
        }
      }

      msg.channel.send(embed)
  } else {
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle('Categories')
      .setColor("RANDOM")

    for (i = 0; i < dir.length; i++) {
      embed.addField(`***${dir[i]}***`, `\`${prefix}help ${(dir[i]).toString().toLowerCase()}\``, true)
    }

    msg.channel.send(embed)
  }
}
