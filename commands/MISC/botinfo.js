exports.run = async(Discord, client, msg, package) => {
  let totalSecs = (client.uptime / 1000)
  let days = Math.floor(totalSecs / 86400)
  let hours = Math.floor(totalSecs / 3600)

  totalSecs %= 3600

  let mins = Math.floor(totalSecs / 60)
  let secs = Math.floor(totalSecs % 60)

  var uptimeResponse = ``

  if (days != 0) {
    addDaysToUptime(Discord, client, msg, package, days, hours, mins, secs, uptimeResponse)
  } else if (hours != 0) {
    addHoursToUptime(Discord, client, msg, package, hours, mins, secs, uptimeResponse)
  } else if (mins != 0) {
    addMinsToUptime(Discord, client, msg, package, mins, secs, uptimeResponse)
  } else {
    addSecsToUptime(Discord, client, msg, package, secs, uptimeResponse)
  }
}

function addDaysToUptime(Discord, client, msg, package, days, hours, mins, secs, uptimeResponse) {
  uptimeResponse += `${days} days, `
  addHoursToUptime(Discord, client, msg, package, hours, mins, secs, uptimeResponse)
}

function addHoursToUptime(Discord, client, msg, package, hours, mins, secs, uptimeResponse) {
  uptimeResponse += `${hours} hours, `
  addMinsToUptime(Discord, client, msg, package, mins, secs, uptimeResponse)
}

function addMinsToUptime(Discord, client, msg, package, mins, secs, uptimeResponse) {
  uptimeResponse += `${mins} minutes, `
  addSecsToUptime(Discord, client, msg, package, secs, uptimeResponse)
}

function addSecsToUptime(Discord, client, msg, package, secs, uptimeResponse) {
  uptimeResponse += `${Discord, client, msg, package, secs} seconds`
  sendEmbed(Discord, client, msg, package, uptimeResponse)
}

function sendEmbed(Discord, client, msg, package, uptimeResponse) {
  const embed = new Discord.MessageEmbed()
    .setTitle('Elsa-Bot Information')
    .setDescription('Here is some information about, and the current status of, Elsa-Bot!')
    .setThumbnail(client.user.avatarURL())
    .addField(`🖥️ Version`, `v${package.version}`, true)
    .addField(`🌐 Ping`, `${Math.round(client.ws.ping)}ms`, true)
    .addField(`🟢 Uptime`, `${uptimeResponse}`)
    .setColor("RANDOM")
  msg.channel.send(embed)
}

exports.name = "Botinfo"
exports.command = "botinfo"
exports.description = "Get information about the bot."