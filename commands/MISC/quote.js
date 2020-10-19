exports.run = function (Discord, msg, args) {
  const fs = require('fs')
  //const profiles = require('../assets/quotes/char-profiles.json')
  fs.readFile(`./assets/quotes/char-profiles.json`, { encoding: 'utf8' }, function (err, data) {
    if (err) {
      return console.log(new Date() + ` - ${err}`)
    } else {
      const profiles = JSON.parse(data)

      var character
      fs.readdir('./assets/quotes/characters', { encoding: 'utf8' }, function (err, chars) {
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

          fs.readdir(`./assets/quotes/characters/${character}`, { encoding: 'utf8' }, function (err, dataa) {
            if (err) {
              return console.log(new Date() + ` - ${err}`)
            } else {
              let quote = dataa[Math.floor(Math.random() * dataa.length)]

              quote = fs.readFile(`./assets/quotes/characters/${character}/${quote}`, { encoding: 'utf8' }, function (err, datab) {
                if (err) {
                  console.log(new Date() + ` - ${err}`)
                } else {
                  quote = JSON.parse(datab)

                  var charProfile = null
                  switch (character) {
                    case 'elsa':
                      charProfile = profiles.elsa
                      break;
                    case 'anna':
                      charProfile = profiles.anna
                      break;
                    case 'kristoff':
                      charProfile = profiles.kristoff
                      break;
                    case 'olaf':
                      charProfile = profiles.olaf
                      break;
                    case 'pabbie':
                      charProfile = profiles.pabbie
                      break;
                  }

                  const embed = new Discord.MessageEmbed()
                    .setAuthor(character.charAt(0).toUpperCase() + character.substring(1), charProfile.icon)
                    .setTitle(`"${quote.text}"`)
                    .setFooter(quote.origin)
                    .setColor(charProfile.color)
                  msg.channel.send(embed)
                }
              })
            }
          })
        }
      })
    }
  })
}


exports.name = "Quotes"
exports.command = "quote [character]"
exports.description = "Get a random quote from your favorite Frozen character!"
