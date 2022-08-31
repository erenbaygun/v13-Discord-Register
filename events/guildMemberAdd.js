const config = require("../config.json")
const moment = require("moment");
moment.locale("tr");
require("moment-duration-format");
require("../structures/function")(client);

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member, client) {
        const kayıtsızRol = member.guild.roles.cache.find(role => role.id == config.kayıt.kayıtsızID)
        const kayıtsızNick = config.kayıt.kayıtsızNick == "" ? null : config.kayıt.kayıtsızNick
        if (kayıtsızNick) await member.setNickname(kayıtsızNick)
        await member.roles.add(kayıtsızRol)

        let kuruluş, zaman
        await client.kurulus(member).then(res => {
            kuruluş = res[0]
            zaman = res[1]
        })

        const kayıtChat = member.guild.channels.cache.find(channel => channel.id == config.kayıt.kayıtchatID)
        kayıtChat.send(`Merhaba ${member} aramıza hoş geldin.  Seninle beraber sunucumuz ${member.guild.memberCount} üye sayısına ulaştı. :tada:\n\nHesabın ${kuruluş} tarihinde (**${zaman}** önce) oluşturulmuş.\n\nSunucumuza kayıt olmak için soldaki ses kanallarından birine girmelisin!\n<@&${config.kayıt.kayıtYetkiliID}> rolündeki yetkililerimiz seninle ilgilenecektir.`)
    },
};
