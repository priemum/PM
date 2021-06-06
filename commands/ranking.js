const canvacord = require("canvacord");
const Discord = require("discord.js");
const prefix = "%";

module.exports = function (f9r) {
    const description = {
        name: "RANKING",
        filename: "ranking.js",
        version: "2.0"
    }
    console.log(` :: Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
    f9r.on("message", async (message) => {

        if (message.author.bot || !message.guild) return;
        const key = `${message.guild.id}-${message.author.id}`;
        function databasing(rankuser) {
            f9r.points.ensure(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, {
user: rankuser ? rankuser.id : message.author.id,
usertag: rankuser ? rankuser.tag : message.author.tag,
xpcounter: 1,
guild: message.guild.id,
points: 0,
neededpoints: 400,
level: 1,
oldmessage: "",
            });
            f9r.points.set(rankuser ? `${message.guild.id}-${rankuser.id}` : `${message.guild.id}-${message.author.id}`, rankuser ? rankuser.tag : message.author.tag, `usertag`);
            f9r.points.set(message.guild.id, 1, `setglobalxpcounter`);
        }
        databasing();

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (message.content.startsWith(prefix)) {

            switch (command) {
case `rank`:
rank(message.mentions.users.first()||message.author);
break;
case `leaderboard`:
case `lb`:
leaderboard();
break;
case `setxpcounter`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")
setxpcounter();
break;
case `setglobalxpcounter`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")
setglobalxpcounter();
break;
case `addpoints`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")
addpoints();
break;
case `setpoints`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

setpoints();
break;
case `removepoints`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

removepoints();
break;
case `addlevel`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

addlevel();
break;
case `setlevel`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

setlevel();
break;
case `removelevel`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

removelevel();
break;
case `resetranking`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

resetranking();
break;
case `registerall`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

registerall();
break;
case `addrandomall`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

addrandomall();
break;
case `resetrankingall`:
if (!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MANAGE_GUILD")) return message.reply("You are not allowed to run this cmd!")

resetrankingall()
break;
case `levelhelp`:
case `rankinghelp`:
case `levelinghelp`:
case `rankhelp`:
levelinghelp();
break;
            }
            return;
        }

        function anti_double_messages() {
            const oldmessage = f9r.points.get(key, `oldmessage`);
            if (oldmessage.toLowerCase() === message.content.toLowerCase().replace(/\s+/g, ''))
            f9r.points.set(key, message.content.toLowerCase().replace(/\s+/g, ''), `oldmessage`);
        }
        anti_double_messages();

        function Giving_Ranking_Points(thekey, maxnumber) {
            let setglobalxpcounter = f9r.points.get(message.guild.id, "setglobalxpcounter")
            if (!maxnumber) maxnumber = 5;
            var randomnum = ( Math.floor(Math.random() * Number(maxnumber)) + 1 ) * setglobalxpcounter;
            randomnum *= Number(f9r.points.get(key, `xpcounter`));
            randomnum = Number(Math.floor(randomnum));

            const curPoints = f9r.points.get(thekey ? thekey : key, `points`);
            const neededPoints = f9r.points.get(thekey ? thekey : key, `neededpoints`);
            let leftpoints = neededPoints - curPoints;

            let toaddpoints = randomnum;
            addingpoints(toaddpoints, leftpoints);

            function addingpoints(toaddpoints, leftpoints) {
if (toaddpoints >= leftpoints) {
f9r.points.set(thekey ? thekey : key, 0, `points`);
f9r.points.inc(thekey ? thekey : key, `level`);
const newLevel = f9r.points.get(thekey ? thekey : key, `level`);
if (newLevel % 4 === 0) f9r.points.math(thekey ? thekey : key, `+`, 100, `neededpoints`)

const newneededPoints = f9r.points.get(thekey ? thekey : key, `neededpoints`);
const newPoints = f9r.points.get(thekey ? thekey : key, `points`);

addingpoints(toaddpoints - leftpoints, newneededPoints);
LEVELUP()
} else {
f9r.points.math(thekey ? thekey : key, `+`, Number(toaddpoints), `points`)
}
            }
        }
        Giving_Ranking_Points();
        const curLevel = f9r.points.get(key, `level`);
        const curPoints = f9r.points.get(key, `points`);
        const neededPoints = f9r.points.get(key, `neededpoints`);

        function LEVELUP() {
const newLevel = f9r.points.get(key, `level`);
const newPoints = f9r.points.get(key, `points`);
const newneededPoints = f9r.points.get(key, `neededpoints`);
const embed = new Discord.MessageEmbed()
.setAuthor(`Ranking of:  ${message.author.tag}`, message.member.user.displayAvatarURL({
    dynamic: true
}))
.setDescription(`You've leveled up to Level: **\`${newLevel}\`**! (Points: \`${newPoints}\` / \`${newneededPoints}\`) `)
.setColor("#EFFBFB");
message.reply(embed);
        }

        function rank(the_rankuser) {

            try {
let rankuser = the_rankuser ? the_rankuser : message.mentions.users.first() ? message.mentions.users.first() : args[0] ? args[0].length == 18 ? message.guild.members.cache.get(args[0]).user : message.guild.members.cache.find(u => u.user.username.toLowerCase().includes(String(args[0]).toLowerCase())).user : message.author
if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
const key = `${message.guild.id}-${rankuser.id}`;
databasing(rankuser);
const filtered = f9r.points.filter(p => p.guild === message.guild.id).array();
const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
const top10 = sorted.splice(0, message.guild.memberCount);
let i = 0;
for (const data of top10) {
try {
    i++;
    if (data.user === rankuser.id) break;
} catch {
    i = `Error counting Rank`;
    break;
}
}
let curpoints = Number(f9r.points.get(key, `points`).toFixed(2));
let curnextlevel = Number(f9r.points.get(key, `neededpoints`).toFixed(2));
if (f9r.points.get(key, `level`) === undefined) i = `No Rank`;
let color;
 let status = rankuser.presence.status;
  if (status === "dnd") { color = "#ff0048"; }
  else if (status === "online") { color = "#00fa81"; }
  else if (status === "idle") { color = "#ffbe00"; }
  else if (status === "invisible") { color = "DEFAULT"; }
    const rank = new canvacord.Rank()
.setAvatar(rankuser.displayAvatarURL({ dynamic: false, format: "png" }))
.setCurrentXP(Number(curpoints.toFixed(4)), "#EFFBFB")
.setRequiredXP(Number(curnextlevel.toFixed(2)),"#EFFBFB")
.setStatus(status, true, 7)
.renderEmojis(true)
.setProgressBar("#2EFEF7")
.setRankColor("#EFFBFB")
.setLevelColor("#EFFBFB")
.setUsername(rankuser.username, "#EFFBFB")
.setRank(Number(i), "Rank", true)
.setLevel(Number(f9r.points.get(key, `level`)), "Level", true)
.setBackground("IMAGE", "https://cdn.discordapp.com/attachments/848618790765330432/848619124631666699/Palestine.png")
.setDiscriminator(rankuser.discriminator, "#EFFBFB");
rank.build()
.then(data => {
    const attachment = new Discord.MessageAttachment(data, "RankCard.png");
    message.channel.send(attachment);
    return;
});
            } catch (error) {
console.log(error.stack)
message.reply("PLEASE ADD A RANKUSER!");
            }
        }

function leaderboardembed() {
            const filtered = f9r.points.filter(p => p.guild === message.guild.id).array();
            let orilent;
            const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
            let embeds = [];
            let j = 0;
            let maxnum = 50;
            orilent = sorted.length;
            if(isNaN(maxnum)) {
console.log("maximum_leaderboard NOT A NUMBER")
maxnum = 50;}
            if (maxnum > sorted.length)
maxnum = sorted.length + (10 - Number(String(sorted.length/10).slice(2)));
            if(maxnum < 10) maxnum = 10;
            for (let i = 10; i <= maxnum; i += 10) {
const top = sorted.splice(0, 10);
const embed = new Discord.MessageEmbed()
.setTitle(`\`${message.guild.name}\` | Leaderboard`)
.setTimestamp()
.setDescription(`Top ${i<orilent?i:orilent}/${orilent} Ranking:`)
.setColor("#EFFBFB");
for (const data of top) {
j++;
try {
    embed.addField(`**${j}**. \`${data.usertag}\``, `**Points:** \`${data.points.toFixed(2)}\` / \`${data.neededpoints}\` | **Level:** \`${data.level}\``);
} catch {
    embed.addField(`**${j}**. \`${data.usertag}\``, `**Points:** \`${data.points.toFixed(2)}\` / \`${data.neededpoints}\` | **Level:** \`${data.level}\``);
}
}
embeds.push(embed);
            }
            return embeds;
        }
        async function leaderboard() {
            let currentPage = 0;
            const embeds = leaderboardembed();
            if(embeds.length == 1){
return message.channel.send(embeds[0])
            }
            const lbembed = await message.channel.send(
`**Current Page - ${currentPage + 1}/${embeds.length}**`,
embeds[currentPage]
            );

            try {
await lbembed.react("⏪");
await lbembed.react("⏹");
await lbembed.react("⏩");
            } catch (error) {
console.error(error);
            }

            const filter = (reaction, user) => ["⏪", "⏹", "⏩"].includes(reaction.emoji.name) && message.author.id === user.id;
            const collector = lbembed.createReactionCollector(filter, {
time: 60000
            });

            collector.on("collect", async (reaction, user) => {
try {
if (reaction.emoji.name === "⏩") {
    if (currentPage < embeds.length - 1) {
        currentPage++;
        lbembed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
    }
} else if (reaction.emoji.name === "⏪") {
    if (currentPage !== 0) {
        --currentPage;
        lbembed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
    }
} else {
    collector.stop();
    reaction.message.reactions.removeAll();
}
await reaction.users.remove(message.author.id);
} catch (error) {
console.error(error);
}
            });
        }

        function setxpcounter(){
            try {
if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
let rankuser = message.mentions.users.first();
if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
const key = `${message.guild.id}-${rankuser.id}`;
databasing(rankuser);
if (!args[1]) return message.reply("PLEASE ADD POINTS TO ADD! Usage: `setxpcounter @USER 2`");
f9r.points.set(key, Number(args[1]), `xpcounter`);
const embed = new Discord.MessageEmbed()
.setColor("#EFFBFB")
.setDescription(`Successfully set XP COUNTER to \`${args[1]}x\` for: \`${rankuser.tag}\``)
message.reply(embed);
            } catch (error) {
console.log(error.stack)
message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function setglobalxpcounter(){
            try {
if (!args[0]) return message.reply("PLEASE ADD POINTS TO ADD! Usage: `setglobalxpcounter 2`");
f9r.points.set(message.guild.id, Number(args[0]), `setglobalxpcounter`);
const embed = new Discord.MessageEmbed()
.setColor("#EFFBFB")
.setDescription(`Successfully set GLOBAL XP COUNTER to \`${args[0]}x\` for: \`${message.guild.name}\``)
message.reply(embed);
            } catch {
            }
        }
        function addpoints(amount) {
            try {
if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
let rankuser = message.mentions.users.first();
if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
const key = `${message.guild.id}-${rankuser.id}`;
databasing(rankuser);

const curPoints = f9r.points.get(key, `points`);
const neededPoints = f9r.points.get(key, `neededpoints`);
let leftpoints = neededPoints - curPoints;
if (!args[1] && !amount) return message.reply("PLEASE ADD POINTS TO ADD! Usage: `addpoints @USER 100`");
if (!amount) amount = Number(args[1]);
if (amount < 0) removepoints(amount);
let toaddpoints = amount;
addingpoints(toaddpoints, leftpoints);

function addingpoints(toaddpoints, leftpoints) {
if (toaddpoints >= leftpoints) {
    f9r.points.set(key, 0, `points`);
    f9r.points.inc(key, `level`);
    const newLevel = f9r.points.get(key, `level`);
    if (newLevel % 4 === 0) f9r.points.math(key, `+`, 100, `neededpoints`)

    const newneededPoints = f9r.points.get(key, `neededpoints`);
    const newPoints = f9r.points.get(key, `points`);

    const embed = new Discord.MessageEmbed()
        .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
            dynamic: true
        }))
        .setDescription(`You've leveled up to Level: **\`${newLevel}\`**! (Points: \`${newPoints + toaddpoints - leftpoints}\` / \`${newneededPoints}\`) `)
        .setColor("#EFFBFB");
    if (toaddpoints - leftpoints < newneededPoints)
        message.channel.send(rankuser, embed);

    addingpoints(toaddpoints - leftpoints, newneededPoints);
} else {
    f9r.points.math(key, `+`, Number(toaddpoints), `points`)
}
}


const embed = new Discord.MessageEmbed()
.setColor("#EFFBFB")
.setDescription(`Successfully added \`${toaddpoints} Points\` to: \`${rankuser.tag}\``)
message.reply(embed);
rank(rankuser); 
            } catch (error) {
console.log(error.stack)
message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function setpoints() {
            try {
if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
let rankuser = message.mentions.users.first();
if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
const key = `${message.guild.id}-${rankuser.id}`;
databasing(rankuser);

let toaddpoints = Number(args[1]);
if (!args[1]) return message.reply("PLEASE ADD POINTS TO SET! Usage: `addpoints @USER 100`");
if (Number(args[1]) < 0) args[1] = 0;
const neededPoints = f9r.points.get(key, `neededpoints`);
addingpoints(toaddpoints, neededPoints);

function addingpoints(toaddpoints, neededPoints) {
if (toaddpoints >= neededPoints) {
    f9r.points.set(key, 0, `points`);
    f9r.points.inc(key, `level`);
    const newLevel = f9r.points.get(key, `level`);
    if (newLevel % 4 === 0) f9r.points.math(key, `+`, 100, `neededpoints`)

    const newneededPoints = f9r.points.get(key, `neededpoints`);
    const newPoints = f9r.points.get(key, `points`);
    const embed = new Discord.MessageEmbed()
        .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
            dynamic: true
        }))
        .setDescription(`You've leveled up to Level: **\`${newLevel}\`**! (Points: \`${newPoints}\` / \`${newneededPoints}\`) `)
        .setColor("#EFFBFB");
    message.channel.send(rankuser, embed);

    addingpoints(toaddpoints - neededPoints, newneededPoints);
} else {
    f9r.points.set(key, Number(toaddpoints), `points`)
}
}

const embed = new Discord.MessageEmbed()
.setColor("#EFFBFB")
.setDescription(`Successfully set \`${toaddpoints} Points\` to: \`${rankuser.tag}\``)
message.channel.send(embed);
rank(rankuser);
            } catch (error) {
console.log(error.stack)
message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function removepoints(amount) {
            try {
if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
let rankuser = message.mentions.users.first();
if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
const key = `${message.guild.id}-${rankuser.id}`;
databasing(rankuser);

const curPoints = f9r.points.get(key, `points`);
const neededPoints = f9r.points.get(key, `neededpoints`);

if (!args[1] && !amount) return message.reply("PLEASE ADD POINTS TO REMOVE! Usage: `addpoints @USER 100`");
if (!amount) amount = Number(args[1]);
if (amount < 0) addpoints(amount);

removingpoints(amount, curPoints);

function removingpoints(amount, curPoints) {
if (amount > curPoints) {
    let removedpoints = amount - curPoints - 1;
    f9r.points.set(key, neededPoints - 1, `points`);
    if (f9r.points.get(key, `level`) == 1) return message.reply("ALREADY AT 0 POINTS");
    f9r.points.dec(key, `level`);
    const newLevel = f9r.points.get(key, `level`);
    if ((newLevel + 1) % 4 === 0) {
        f9r.points.math(key, `-`, 100, `points`)
        f9r.points.math(key, `-`, 100, `neededpoints`)
    }

    const newneededPoints = f9r.points.get(key, `neededpoints`);
    const newPoints = f9r.points.get(key, `points`);
    const embed = new Discord.MessageEmbed()
        .setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
            dynamic: true
        }))
        .setDescription(`You've leveled down to Level: **\`${newLevel}\`**! (Points: \`${newPoints - amount + removedpoints}\` / \`${newneededPoints}\`) `)
        .setColor("#EFFBFB");
    if (amount - removedpoints < neededPoints)
        message.channel.send(rankuser, embed);

    removingpoints(amount - removedpoints, newneededPoints);
} else {
    f9r.points.math(key, `-`, Number(amount), `points`)
}
}

const embed = new Discord.MessageEmbed()
.setColor("#EFFBFB")
.setDescription(`Successfully removed \`${amount} Points\` from: \`${rankuser.tag}\``)
message.reply(embed);
rank(rankuser);
            } catch (error) {
console.log(error.stack)
message.reply("PLEASE ADD A RANKUSER!");
            }
        }
        function addlevel() {
            try {
if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
let rankuser = message.mentions.users.first();
if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
const key = `${message.guild.id}-${rankuser.id}`;
databasing(rankuser);
let newLevel = f9r.points.get(key, `level`);
if (!args[1]) return message.reply("Please add the amount of Levels you want to add to! Usage: addlevel @User 4");
if (Number(args[1]) < 0) args[1] = 0;
for (let i = 0; i < Number(args[1]); i++) {
f9r.points.set(key, 0, `points`);
f9r.points.inc(key, `level`);
newLevel = f9r.points.get(key, `level`);
if (newLevel % 4 === 0) f9r.points.math(key, `+`, 100, `neededpoints`)
}
const newneededPoints = f9r.points.get(key, `neededpoints`);
const newPoints = f9r.points.get(key, `points`);
const embed = new Discord.MessageEmbed()
.setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
    dynamic: true
}))
.setDescription(`You've leveled up to Level: **\`${newLevel}\`**! (Points: \`${newPoints}\` / \`${newneededPoints}\`) `)
.setColor("#EFFBFB");
message.channel.send(rankuser, embed);
rank(rankuser);
const sssembed = new Discord.MessageEmbed()
.setColor("#EFFBFB")
.setDescription(`Successfully added ${args[1]} Levels to: \`${rankuser.tag}\``)
message.reply(sssembed);
            } catch (error) {
console.log(error.stack)
message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function setlevel() {
            try {
if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
let rankuser = message.mentions.users.first();
if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
const key = `${message.guild.id}-${rankuser.id}`;
databasing(rankuser);

if (!args[1]) return message.reply("Please add the amount of Levels you want to set to! Usage: setlevel @User 3");
if (Number(args[1]) < 1) args[1] = 1;
f9r.points.set(key, Number(args[1]), `level`);
f9r.points.set(key, 0, `points`);

let newLevel = f9r.points.get(key, `level`);
let counter = Number(newLevel) / 4;

f9r.points.set(key, 400, `neededpoints`)
for (let i = 0; i < Math.floor(counter); i++) {
f9r.points.math(key, `+`, 100, `neededpoints`)
}
const newneededPoints = f9r.points.get(key, `neededpoints`);

const newPoints = f9r.points.get(key, `points`);
const embed = new Discord.MessageEmbed()
.setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
    dynamic: true
}))
.setDescription(`You've leveled up to Level: **\`${newLevel}\`**! (Points: \`${newPoints}\` / \`${newneededPoints}\`) `)
.setColor("#EFFBFB");
message.channel.send(rankuser, embed);
rank(rankuser);
const sssembed = new Discord.MessageEmbed()
.setColor("#EFFBFB")
.setDescription(`Successfully set \`${rankuser.tag}\` to Level: ${args[1]}`)
message.reply(sssembed);
            } catch (error) {
console.log(error.stack)
message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function removelevel() {
            try {
if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
let rankuser = message.mentions.users.first();
if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
const key = `${message.guild.id}-${rankuser.id}`;
databasing(rankuser);
let newLevel = f9r.points.get(key, `level`);
if (!args[1]) return message.reply("Please add the amount of Levels you want to remove to! Usage: removelevel @User 4");
if (Number(args[1]) < 0) args[1] = 0;
for (let i = 0; i < Number(args[1]); i++) {
f9r.points.set(key, 0, `points`);
f9r.points.dec(key, `level`);
newLevel = f9r.points.get(key, `level`);
if(newLevel < 1) f9r.points.set(key, 1 ,`level`);
}
snewLevel = f9r.points.get(key, `level`);
let counter = Number(snewLevel) / 4;

f9r.points.set(key, 400, `neededpoints`)
for (let i = 0; i < Math.floor(counter); i++) {
f9r.points.math(key, `+`, 100, `neededpoints`)
}
const newneededPoints = f9r.points.get(key, `neededpoints`);
const newPoints = f9r.points.get(key, `points`);

const embed = new Discord.MessageEmbed()
.setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
    dynamic: true
}))
.setDescription(`You've leveled down to Level: **\`${newLevel}\`**! (Points: \`${newPoints}\` / \`${newneededPoints}\`) `)
.setColor("#EFFBFB");
message.channel.send(rankuser, embed);
rank(rankuser);
const sssembed = new Discord.MessageEmbed()
.setColor("#EFFBFB")
.setDescription(`Successfully removed \`${args[0]}\` Levels from:  \`${rankuser.tag}\``)
message.reply(sssembed);
            } catch (error) {
console.log(error.stack)
message.reply("PLEASE ADD A RANKUSER!");
            }
        }
        function resetranking() {
            try {
if (!args[0]) return message.reply("PLEASE ADD A RANKUSER!");
let rankuser = message.mentions.users.first();
if (!rankuser) return message.reply("PLEASE ADD A RANKUSER!");
const key = `${message.guild.id}-${rankuser.id}`;
databasing(rankuser);

f9r.points.set(key, 1, `level`);
f9r.points.set(key, 0, `points`);
f9r.points.set(key, 400, `neededpoints`)
f9r.points.set(key, "", `oldmessage`);

const embed = new Discord.MessageEmbed()
.setAuthor(`Ranking of:  ${rankuser.tag}`, rankuser.displayAvatarURL({
    dynamic: true
}))
.setDescription(`You've been resetted to Level: **\`1\`**! (Points: \`0\` / \`400\`) `)
.setColor("#EFFBFB");
message.channel.send(rankuser, embed);
rank(rankuser); 
const sssembed = new Discord.MessageEmbed()
.setColor("#EFFBFB")
.setDescription(`Successfully resetted ranking from:  \`${rankuser.tag}\``)
message.reply(sssembed);
            } catch (error) {
console.log(error.stack)
message.reply("PLEASE ADD A RANKUSER!");
            }
        }

        function registerall() {
            let allmembers = message.guild.members.cache.keyArray();
            for (let i = 0; i < allmembers.length; i++) {
//Call the databasing function!
let rankuser = message.guild.members.cache.get(allmembers[i]).user;
databasing(rankuser);
            }
            const embed = new Discord.MessageEmbed()
            .setColor("#EFFBFB")
            .setDescription(`Successfully registered everyone`)
            message.reply(embed);
        }

        function resetrankingall() {
            let allmembers = message.guild.members.cache.keyArray();
            for (let i = 0; i < allmembers.length; i++) {
let rankuser = message.guild.members.cache.get(allmembers[i]).user;
const key = `${message.guild.id}-${rankuser.id}`;
f9r.points.set(key, 1, `level`); //set level to 0
f9r.points.set(key, 0, `points`); //set the points to 0
f9r.points.set(key, 400, `neededpoints`) //set neededpoints to 0 for beeing sure
f9r.points.set(key, "", `oldmessage`); //set old message to 0
            }
            const embed = new Discord.MessageEmbed()
            .setColor("#EFFBFB")
            .setDescription(`Successfully resetted everyone`)
            message.reply(embed);
        }

        function addrandomall() {
            let maxnum = 5;
            if (args[0]) maxnum = Number(args[0]);
            let allmembers = message.guild.members.cache.keyArray();
            for (let i = 0; i < allmembers.length; i++) {
//Call the databasing function!
let rankuser = message.guild.members.cache.get(allmembers[i]).user;
databasing(rankuser);
if(rankuser.bot) continue;
Giving_Ranking_Points(`${message.guild.id}-${rankuser.id}`, maxnum);
Giving_Ranking_Points(`${message.guild.id}-${message.author.id}`, maxnum);
            }
            const embed = new Discord.MessageEmbed()
            .setColor("#EFFBFB")
            .setDescription(`Successfully added ${args[0]} Points to  everyone`)
            message.reply(embed);
        }



        function levelinghelp() {
            const embed = new Discord.MessageEmbed()
.setTitle(`\`${message.guild.name}\` | Ranking Commands`)
.setTimestamp()
.setDescription(`> **HELP:**  \`${prefix}levelinghelp\``)
.setColor("#EFFBFB")
.addFields([{
    name: "`rank [@User]`",
    value: ">>> *Shows the Rank of a User*",
    inline: true
},
{
    name: "`leaderboard`",
    value: ">>> *Shows the Top 10 Leaderboard*",
    inline: true
},
{
    name: "`setxpcounter <@USER> <AMOUNT>`",
    value: ">>> *Changes the amount of how much to count, x1, x2, x3, ...*",
    inline: true
},

{
    name: "`addpoints <@User> <Amount`",
    value: ">>> *Add a specific amount of Points to a User*",
    inline: true
},
{
    name: "`setpoints <@User> <Amount`",
    value: ">>> *Set a specific amount of Points to a User*",
    inline: true
},
{
    name: "`removepoints <@User> <Amount`",
    value: ">>> *Remove a specific amount of Points to a User*",
    inline: true
},

{
    name: "`addlevel <@User> <Amount`",
    value: ">>> *Add a specific amount of Levels to a User*",
    inline: true
},
{
    name: "`setlevel <@User> <Amount`",
    value: ">>> *Set a specific amount of Levels to a User*",
    inline: true
},
{
    name: "`removelevel <@User> <Amount`",
    value: ">>> *Remove a specific amount of Levels to a User*",
    inline: true
},

{
    name: "`resetranking <@User>`",
    value: ">>> *Resets the ranking of a User*",
    inline: true
},
{
    name: "`setglobalxpcounter <AMOUNT>`",
    value: ">>> *Sets the global xp counter for this guild, standard 1*",
    inline: true
},
{
    name: "\u200b",
    value: "\u200b",
    inline: true
},

{
    name: "`registerall`",
    value: ">>> *Register everyone in the Server to the Database*",
    inline: true
},
{
    name: "`resetrankingall`",
    value: ">>> *Reset ranking of everyone in this Server*",
    inline: true
},
{
    name: "`addrandomall`",
    value: ">>> *Add a random amount of Points to everyone*",
    inline: true
}
])
            message.channel.send(embed)
        }

    })
}