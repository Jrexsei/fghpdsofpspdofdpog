const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json")
module.exports = {
    name: 'kayıtsız',
    aliases: ["unregistered", "kayitsiz", "unreg", "unregister", "ks"],
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed().setFooter("Developed By Jahky").setAuthor(message.author.username, message.author.avatarURL()).setTimestamp().setColor("00f1ff");
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (message.member.roles.cache.get(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Ne yazık ki komutu kullanan kişide yetki yok"));
        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcıyı etiketle."));
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!"))
        }
        if (member.roles.cache.has(config.roles.boosterrole) && !member.roles.cache.has(config.roles.viprole)) return message.channel.send(embed.setDescription("Booster ve vip kullanıcıları kayıtsıza atamazsın"));
        await message.guild.members.cache.get(member.id).roles.set(config.registration.unregistered);
        message.channel.send(embed.setDescription("Kullanıcı kayıtsıza atıldı"))
    }
}