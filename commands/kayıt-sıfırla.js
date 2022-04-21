const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const db = require('quick.db');
require("../structures/function")(client);

module.exports = {
    name: 'kayıt-sıfırla',
    aliases: ["kayıt-sıfırla", "teyit-sıfırla", "kreset"],
    usage: "!kayıt-sıfırla id",
    run: async (client, message, args) => {
        const id = message.mentions.users.size > 0 ? message.mentions.users.first().id : args[0]
        if (!id) return message.reply(`:x: | Geçerli bir kullanıcı id'si girmelisin.`).then(msg => { setTimeout(() => { msg.delete() }, 10000); });

        if (!message.member.roles.cache.has(config.kayıt.kayıtYetkiliID) && !message.member.permissions.has(8)) return message.reply(':x: | Bu komutu kullanabilmek için gerekli izinlere sahip değilsin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); })

        db.delete(`isimler_${id}`)
        let embed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RANDOM')
            .setDescription(`<@${id}> kullanıcısına ait kayıt geçmişi silindi!`)

        message.reply({ embeds: [embed] })

    }
}