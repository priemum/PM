const express = require("express");
const app = express();
const db = require("quick.db");
const dev = "708453785499992154";
 
app.listen();
app.use('/ping', (req, res) => {
  res.send(new Date());
});
require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "%";
client.commands = new Discord.Collection();
client.queue = new Map()
client.config = {
  SOUNDCLOUD: 'dmDh7QSlmGpzH9qQoH1YExYCGcyYeYYC'
}
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  }); 
});
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});
client.on('message', message => {
if(message.content.startsWith(prefix + "help")) {
let embed = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL)
.setAuthor("Commands of "+client.user.username, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
.setThumbnail(message.author.avatarURL())
.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
.setDescription(`**\`${prefix}help\`** ~ To show all commands.
**\`${prefix}leave\`** ~ Leave The Voice Channel!.
**\`${prefix}loop\`** ~ Toggle music loop.
**\`${prefix}lyrics\`** ~ Get lyrics for the currently playing song.
**\`${prefix}nowplaying\`** ~ To show the music which is currently playing in this server.
**\`${prefix}pause\`** ~ To pause the current music in the server.
**\`${prefix}play <YouTube_URL> | <song_name>\`** ~ To play songs.
**\`${prefix}playlist <YouTube Playlist URL> | <Playlist Name>\`** ~ To play songs.
**\`${prefix}queue\`** ~ To show the server songs queue.
**\`${prefix}remove <number>\`** ~ Remove song from the queue.
**\`${prefix}resume\`** ~ To resume the paused music.
**\`${prefix}search <song_name>\`** ~ To search songs.
**\`${prefix}shuffle\`** ~ Shuffle queue.
**\`${prefix}skip\`** ~ To skip the current music.
**\`${prefix}skipto <number>\`** ~ Skip to the selected queue number.
**\`${prefix}stop\`** ~ To stop the music and clearing the queue.
**\`${prefix}volume\`** ~ To change the server song queue volume.`)
.setColor("RANDOM")
message.channel.send(embed)
}
});

client.login('ODM2NjgzNzY1NTM1MzQyNjgy.YIhkeg.5TnKS61wMogZL9kAoAYOXwB42YY')

const f9r = new Discord.Client();

f9r.on("ready", () =>{
console.clear();
console.log(`Logged in as ${f9r.user.tag}!
servers! ["${f9r.guilds.cache.size}"]
channels! ["${
f9r.channels.cache.size}"]
Users! ["${f9r.users.cache.size}"]`);
f9r.user.setActivity(`${prefix}help`)
}).on("message", msg => {
  var args = msg.content.split(" ").slice(1).join(" ")
  if(msg.content.startsWith(prefix + "say")){
    if (!dev) return;
    msg.delete()
       msg.channel.send(`${args}`)
  }
}).on("message", msg => {
var args = msg.content.split(" ").slice(1).join(" ")
if(msg.content.startsWith(prefix + "embed")){
    if(!dev) return;
    msg.delete()
  let embed = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(`${args}`)
msg.channel.send(embed)
}
}).on("message", msg => {
if (msg.content.startsWith(prefix + "clear")){
    if (!msg.guild) return;
    if (!msg.member.hasPermission("MANAGE_GUILD")) return msg.ract("❌")
    if (!msg.guild.member(f9r.user).hasPermission("MANAGE_GUILD")) return msg.react("❌")
    let args = msg.content.split(" ").slice(1)
    let msgcount = parseInt(args);
    if(args > 100) return msg.channel.send(`\`\`\`javascript
i Can't delete more than 100 msgs \`\`\``).then(msgs => msgs.delete(3000))
    if (!msgcount) msgcount = "100";
    msg.delete().then(msg => {
    msg.channel.msgs.fetch({ limit: 100 }).then(msgs => msg.channel.bulkDelete(msgcount)).then(msgs => {
      msg.channel.send(`\`\`\`js
${msgs.size} msgs cleared\`\`\``).then(msgs => msgs.delete({ timeout: 3000 }));
    })
    })
  }
}).on("message", async msg => {
    if(msg.content.startsWith(prefix + "warn")){
    if (!msg.member.hasPermission("MANAGE_GUILD")) return msg.react("❌");
    let user = msg.mentions.users.first();
    if (!user) return msg.reply(`**:rolling_eyes: I Can't find this member**`)
    let reason = msg.content.split(" ").slice(2).join(" ");
    if (!reason) return msg.reply(`**:rolling_eyes: Please specify a reason.**`)
    var warns = await db.fetch(`warns_${msg.guild.id}_${msg.author.id}`);
    if (warns == null) db.set(`warns_${msg.guild.id}_${msg.author.id}`, {
warns: 0
    })
    if (warns == 3) {
msg.guild.owner.send(`<@!${user.id}> Has Benn Rished 3 Warns!`)
    }
    if (warns == 10) {
msg.guild.owner.send(`<@!${user.id}> Has Benn Rished 10 Warns!`)
    }
    if (warns == 15) {
msg.guild.owner.send(`<@!${user.id}> Has Benn Rished 15 Warns!`)
    }
    if (warns == 20) {
msg.guild.owner.send(`<@!${user.id}> Has Benn Rished 20 Warns!`)
    }
    if (warns == 25) {
msg.guild.owner.send(`<@!${user.id}> Has Benn Rished 25 Warns!`)
    }
    db.add(`warns_${msg.guild.id}_${msg.author.id}.warns`, 1)
    user.send(new Discord.MessageEmbed()
.addField(`**:warning: You were warned!**`, reason)
.setFooter(msg.guild.name, msg.guild.iconURL()).setTimestamp().setColor("RANDOM")
    ).catch(err => console.error(err))
    msg.react('✅')
    }}).on('message', msg => {
if(msg.content.startsWith(prefix + 'role')){
if(!msg.member.hasPermission('ADMINISTRATOR')) return;
let args = msg.content.split(' ');
let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
let role = msg.mentions.roles.first() || msg.guild.roles.cache.find(role => role.name == args[2]);
if(msg.member.roles.highest.position  && msg.guild.owner.id !== msg.author.id || role.position === msg.member.roles.highest.position && !msg.guild.owner.id == msg.author.id) return msg.react('❌')
if(!args) return msg.react('❌')
if(!user) return msg.react('❌')
if(!role) return msg.react('❌')
if(user.roles.cache.has(role.id)) return user.roles.remove(role).then(msg2 => { msg.react('✅') })
user.roles.add(role)
msg.react('✅')
  }
}).on('message', msg => {
    var user = msg.mentions.users.first() || f9r.users.cache.get(msg.content.split(' ')[1])
    if (msg.content.startsWith(prefix + 'ban')) {
if (msg.author.bot) return;
if (msg.channel.type == 'dm') return;
if (!msg.guild.me.hasPermission('BAN_MEMBERS')) 
 return msg.react('❌')
if (!msg.member.hasPermission('BAN_MEMBERS'))  return msg.react('❌')
if (!user)  return msg.react('❌')
msg.guild.members.ban(user);
msg.guild.owner.send(`This User <@!${user}> Has Ben banned By <@!${msg.author.id}>`)
msg.react(`✅`)
    }
  }).on('message', msg => {
    var user = msg.mentions.users.first() || f9r.users.cache.get(msg.content.split(' ')[1])
    if (msg.content.startsWith(prefix + 'unban')) {
if (msg.author.bot) return;
if (msg.channel.type == 'dm') return;
if (!msg.guild.me.hasPermission('BAN_MEMBERS')) 
 return msg.react('❌')
if (!msg.member.hasPermission('BAN_MEMBERS'))  return msg.react('❌')
if (!user)  return msg.react('❌')
msg.guild.members.unban(user);
msg.guild.owner.send(`This User <@!${user}> Has Ben banned By <@!${msg.author.id}>`)
msg.react(`✅`)
    }
  }).on('message', msg => {
    var user = msg.mentions.users.first() || f9r.users.cache.get(msg.content.split(' ')[1])
    if (msg.content.startsWith(prefix + 'kick')) {
if (!msg.guild) return;
if (!msg.guild.me.hasPermission('KICK_MEMBERS')) 
 return msg.react('❌')
if (!user)  return msg.react('❌')
user.kick();
msg.guild.owner.send(`This User <@!${user}> Has Ben kicked By <@!${msg.author.id}>`)
msg.react(`✅`)
    }
  }).on('message', msg => {
    if(msg.content.startsWith(prefix + 'hide')){
    if (msg.author.bot) return;
    if (msg.channel.type == 'dm') return;
    if(!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.react('❌')
    msg.channel.createOverwrite(msg.guild.id, {
  VIEW_CHANNEL: false
    }).then(() => {
    msg.react('✅')
    })
}  
}).on('message', msg => {
    if(msg.content.startsWith(prefix + 'show')){
    if (!msg.guild) return;
  if(!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.react('❌')
  msg.channel.createOverwrite(msg.guild.id, {
VIEW_CHANNEL: true
  }).then(() => {
    msg.react('✅')
  })
    }
}).on('message', msg => {
    if(msg.content.startsWith(prefix + 'lock')){
    if (!msg.guild) return;
    if(!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.react('❌')
    msg.channel.createOverwrite(msg.guild.id, {
  SEND_msgS: false
    }).then(() => {
    msg.react('✅')
    })
}  
}).on('message', msg => {
    if(msg.content.startsWith(prefix + 'unlock')){
    if (!msg.guild) return;
  if(!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.react('❌')
  msg.channel.createOverwrite(msg.guild.id, {
SEND_msgS: true
  }).then(() => {
    msg.react('✅')
  })
    }
}).on('message', msg => {
  var args = msg.content.split(' ').slice(1).join(' ')
  if(msg.content.startsWith(prefix + 'setname')){
    if(!msg.guild) return;
    if(!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.react('❌')
    msg.channel.setName(args)
    msg.react('✅')
  }
}).on('message', msg => {
  if(msg.content.startsWith(prefix + 'delete')){
    msg.react('✅')
    if(!msg.guild) return;
    if(!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.react('❌')
     msg.channel.delete() 
  }
}).on('message', msg => {
  if(msg.content.startsWith(prefix + 'create')){
      if(!dev) return;
      if(!msg.member.hasPermission('MANAGE_CHANNELS')) return (':x:');
var args = msg.content.split(' ').slice(1).join(' ')
msg.guild.channels.create(`${args}`, { type: 'text' }).then(cc => {
let everyone = msg.guild.roles.cache.find(r => r.name === '@everyone');
let category = msg.channel.parnetID;
if(!category) return 
if(category) {
cc.setParent(category);
}
cc.createOverwrite(everyone, {
SEBD_MESSAGE: false,
VIEW_CHANNEL: false,
READ_msg_HISTORY: false })
  msg.react('✅')
})
  }
}).on("message", msg => {
  if(msg.content.startsWith("https://") || 
  msg.content.startsWith('.com') || 
  msg.content.startsWith('.com/') || 
  msg.content.startsWith('discord.gg') || 
  msg.content.startsWith('https://')){
    if(msg.author.bot) return;
    if(msg.channel.type == "dm") return;
      if(!msg.member.hasPermission("ADMINISTRATOR"))
     return msg.delete().then(msg => { msg.reply(`Don't Send Links Again`).then(msg => { msg.delete({ timeout: 5000})
})
      })
}
})

f9r.login('ODE3MTA1NTUyNjQ2NzMzOTI0.YEEq2A.CUFrAUmxg_BH7HoBMkXU5arvzIs')
