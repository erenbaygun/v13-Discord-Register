const { joinVoiceChannel } = require("@discordjs/voice");
const config = require("../config.json")
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const VoiceChannel = client.channels.cache.get(config.voiceChannelID);
        joinVoiceChannel({
            channelId: VoiceChannel.id,
            guildId: VoiceChannel.guild.id,
            adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
            selfDeaf: true
        });
        console.log(`${client.user.tag} başarıyla aktif edildi.`);
    },
};