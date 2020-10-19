const Discord = require('discord.js')
const client = new Discord.Client()

const login = require('./token.json')
const commands = require('./commands')
const responses = require('./responses')

// Bot enabled
client.once('ready', async () => {
  console.log(new Date() + ' - Elsa is now awake.')

  client.user.setPresence({ activity: { name: 'Frozen 2', type: 'WATCHING' } })
})

// Bot joins guild
client.on('guildCreate', (guild) => {
  console.log(new Date() + ` - Joined guild: ${guild.name} - ${guild.id}`)
})

// Bot leaves guild
client.on('guildDelete', (guild) => {
  console.log(new Date() + ` - Left guild: ${guild.name} - ${guild.id}`)
})

// Message seen
client.on('message', (msg) => {

  if (msg.content.includes(' elsa ')) {
    responses.elsa.run(Discord, msg)
  }

  if (msg.mentions.has(client.user)) {
    const attachment = new Discord.MessageAttachment(`./assets/anna/knock.gif`)
    msg.channel.send(attachment)
  }

  const prefix = 'e!'
  const args = msg.content.slice(prefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase()

  if (msg.content.indexOf(prefix) !== 0) { return }

  switch (cmd) {
    case 'help':
        commands.help.get(Discord, msg, client, prefix, args)
      break;
    case 'quote':
      commands.quote.run(Discord, msg, args)
      break;
    case 'hug':
      commands.hug.run(Discord, msg, args)
      break;
    case 'snowball':
      commands.snowball.run(Discord, msg)
  }
})

client.login(login.token)
