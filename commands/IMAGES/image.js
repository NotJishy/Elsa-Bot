exports.run = function(Discord, msg, args, prefix) {
    if (!args[0]) {
        msg.reply(`Please specify a character to get an image or GIF of! Do \`${prefix}help images\` for a list of characters!`)
    } else {
        const fs = require('fs')
        const chars = fs.readdirSync(`./commands/IMAGES/chars`)
        const charName = (args[0]).toLowerCase()

        var count = 0
        for (i = 0; i < chars.length; i++) {
            if (charName == (chars[i]).replace('.js', '')) {
                count++
            }
        }

        if (count > 0) {
            fs.readdir(`./assets/images/${charName}`, { encoding: 'utf8' }, function(err, data) {
                if (err) {
                  return console.log(new Date() + ` - ${err}`)
                } else {
                    let file = data[Math.floor(Math.random() * data.length)]
            
                    const attachment = new Discord.MessageAttachment(`./assets/images/${charName}/${file}`)
            
                    const embed = new Discord.MessageEmbed()
                        .attachFiles(attachment)
                        .setImage(`attachment://${file}`)

                    switch (charName) {
                        case 'elsa':
                            embed.setColor('#40ccf6')
                            break;
                        case 'anna':
                            embed.setColor('#19bf00')
                            break;
                        case 'olaf':
                            embed.setColor('#E1E1E1')
                            break;
                        case 'sven':
                            embed.setColor('#664C39')
                    }

                    msg.channel.send(embed)
                }
              })
        } else {
            msg.reply(`That character does not exist or has not been added yet! Do \`${prefix}help images\` for a list of characters!`)
        }
    }
}