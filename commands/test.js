require("../structures/function")(client);

module.exports = {
    name: 'test',
    aliases: ["test"],
    run: async (client, message, args) => {
        console.log("test")
    }
}