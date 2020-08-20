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
      .setColor('AQUA')

      dir = fs.readdirSync(`./commands/${cat}`)

      for (i = 0; i < dir.length; i++) {
        var cmd = require(`./commands/${cat}/${dir[i]}`)
        embed.addField(`***${cmd.name}***`, `\`${prefix}${cmd.command}\``, true)
      }

      msg.channel.send(embed)
  } else {
    const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle('Categories')
      .setColor('AQUA')

    for (i = 0; i < dir.length; i++) {
      embed.addField(`***${dir[i]}***`, `\`${prefix}help ${(dir[i]).toString().toLowerCase()}\``, true)
    }

    msg.channel.send(embed)
  }
}
