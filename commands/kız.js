const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const db = require('quick.db')
require("../structures/function")(client);

module.exports = {
    name: 'kız',
    aliases: ["kız", "kiz", "k"],
    usage: "!kız @kullanıcı isim yaş",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(':x: | Geçerli bir kullanıcı belirtmelisin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        const member = message.mentions.users.size > 0 ? message.guild.members.cache.get(message.mentions.users.first().id) : message.guild.members.cache.get(args[0]);

        let name = args[1]
        let age = args[2]

        if (!message.member.roles.cache.has(config.kayıt.kayıtYetkiliID) && !message.member.permissions.has(8)) return message.reply(':x: | Bu komutu kullanabilmek için gerekli izinlere sahip değilsin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); })
        if (!member) return message.reply(':x: | Geçerli bir kullanıcı belirlemelisin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (!name) return message.reply(':x: | Geçerli bir isim belirlemelisin.\n\n`Doğru kullanım: !kız @kullanıcı isim yaş`').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (!age) return message.reply(':x: | Geçerli bir yaş belirlemelisin.\n\n`Doğru kullanım: !kız @kullanıcı isim yaş`').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (isNaN(age)) return message.reply(':x: | Yaş, geçerli rakamlarla girilmeli.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (!member.roles.cache.has(config.kayıt.kayıtsızID)) return message.reply(':x: | Kullanıcının kayıtsız rolü yok.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });

        await member.setNickname(`${config.kayıt.tag} ${name} | ${age}`);
        await member.roles.add(config.kayıt.kızID);
        await member.roles.remove(config.kayıt.kayıtsızID)

        let embed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RANDOM')
            .setDescription(`${member} adlı üye **Kız** olarak kayıt oldu!`)

        message.reply({ embeds: [embed] })

        let kayit = {
            name: `${member.nickname}`,
            rol: "Kız",
            yetkili: {
                name: `${message.member.nickname ? message.member.nickname : message.author.username}`,
                id: `${message.author.id}`
            }
        }
        if (!db.fetch(`isimler_${member.id}`)) await db.set(`isimler_${member.id}`, [])
        await db.push(`isimler_${member.id}`, kayit)
    }
}
