const Canvas = require("canvas");
const Discord = require("discord.js");
const f9r = new Discord.Client();

module.exports = function (f9r) {
    const description = {
        name: "WelcomeImages",
        filename: "welcome.js",
        version: "4.8"
    }
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
    f9r.on("guildMemberAdd", async member => {
      if(!member.guild) return;
      const canvas = Canvas.createCanvas(1772, 633);
      const ctx = canvas.getContext('2d');
      const background = await Canvas.loadImage(`./commands/welcome.png`);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      var textString3 = `${member.user.username}`;
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 40px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString2, 730, canvas.height / 2 + 58);
      var textString4 = `Member #${member.guild.memberCount}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 750, canvas.height / 2 + 125);
      var textString4 = `${member.guild.name}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      const channel = member.guild.channels.cache.find(ch => ch.id === "844373231700148235");
      channel.send(`**Welcome to ${member.guild.name}!**
Hi <@${member.id}>!, read and accept the rules!`, attachment);
    })
}
f9r.on('guildMemberAdd', async(member) => {
  let owner = await member.guild.members.fetch('708453785499992154')
  if(member.user.bot) return member.ban();
  owner.send(`\`${member.user.suername}\` Has been Banned By Antibot`)
}).on("guildMemberRemove", member => {
    const channel = member.guild.channels.cache.find(ch => ch.id === "846813100824723496");
    if (!channel) return;
    channel.send(`<@${member.user.id}> Left The Server`);
     })