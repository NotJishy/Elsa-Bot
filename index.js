const Discord = require('discord.js')
const client = new Discord.Client()

const login = require('./token.json')
const package = require('./package.json')
const commands = require('./commands')

// Bot enabled
client.once('ready', async () => {
  console.log('-----------------------------------------------------------------\n\n' +
              'Elsa-Bot is now online!\n' +
              `Total Guilds: ${client.guilds.cache.size}\n` +
              new Date() + '\n\n' +
              '-----------------------------------------------------------------')

  client.user.setPresence({ activity: { name: 'Once Upon A Snowman', type: 'WATCHING' } })
})

// Bot joins guild
client.on('guildCreate', (guild) => {
  console.log('----------------------------------------------------------------- \n\n' +
              '                     NEW GUILD JOINED                              \n' +
              `Guild Name: ${guild.name}\n` +
              `Guild ID: ${guild.id}\n\n` +
              `Total Guilds: ${client.guilds.cache.size}\n` +
              `${new Date()}\n\n` +
              '-----------------------------------------------------------------')
})

// Bot leaves guild
client.on('guildDelete', (guild) => {
  console.log('----------------------------------------------------------------- \n\n' +
              '                        GUILD REMOVED                             \n' +
              `Guild Name: ${guild.name}\n` +
              `Guild ID: ${guild.id}\n\n` +
              `Total Guilds: ${client.guilds.cache.size}\n` +
              `${new Date()}\n\n` +
              '-----------------------------------------------------------------')
})

// Message seen
client.on('message', (msg) => {

  msg.content = msg.content.toLowerCase()

  const prefix = 'e!'
  const args = msg.content.slice(prefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase()

  if (msg.mentions.has(client.user)) {

    if ((msg.content.includes("@everyone") || msg.content.includes("@here")) != true) {
      const attachment = new Discord.MessageAttachment(`./assets/images/anna/knock.gif`)
      msg.channel.send(attachment)
    }

  }

  if (msg.content.indexOf(prefix) !== 0) { return }

  switch (cmd) {
    case 'help':
        commands.help.get(Discord, msg, client, prefix, args)
      break;
    case 'botinfo':
        commands.botinfo.run(Discord, client, msg, package)
      break;
    case 'quote':
      commands.quote.run(Discord, msg, args)
      break;
    case 'hug':
      commands.hug.run(Discord, msg)
      break;
    case 'snowball':
      commands.snowball.run(Discord, msg)
      break;
    case 'image':
      commands.image.run(Discord, msg, args, prefix)
  }
})

client.login(login.token)
