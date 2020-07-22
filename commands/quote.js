exports.run = function (Discord, msg, args) {
  const fs = require('fs')

  var character
  fs.readdir('./assets/quotes', { encoding: 'utf8' }, function (err, chars) {
    if (err) {
      console.log(new Date() + ` - ${err}`)
    } else {
      var count = 0
      chars.forEach(char => {
        if (args[0]) {
          if (args[0].toLowerCase() == char) {
            character = char
            count++
          }
        }
      })

      if (count == 0) {
        character = chars[Math.floor(Math.random() * chars.length)]
      }

      fs.readdir(`./assets/quotes/${character}`, { encoding: 'utf8' }, function (err, dataa) {
        if (err) {
          return console.log(new Date() + ` - ${err}`)
        } else {
          let quote = dataa[Math.floor(Math.random() * dataa.length)]

          quote = fs.readFile(`./assets/quotes/${character}/${quote}`, { encoding: 'utf8' }, function (err, datab) {
            if (err) {
              console.log(new Date() + ` - ${err}`)
            } else {
              quote = JSON.parse(datab)

              const embed = new Discord.MessageEmbed()
                .setAuthor(character.charAt(0).toUpperCase() + character.substring(1), "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fscratchpad%2Fimages%2F2%2F24%2FElsa_OFA.jpg%2Frevision%2Flatest%3Fcb%3D20180227094540&f=1&nofb=1")
                .setTitle(quote.text)
                .setFooter(quote.origin)
              msg.channel.send(embed)
            }
          })
        }
      })
    }
  })
}
