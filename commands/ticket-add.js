const Ticket = require('../models/Ticket');
const FUNC = require("../resources/functions.js");

module.exports = {
    name: 'add',
    description: "Adds a user to a ticket. (Staff Only)",
    async execute(message) {
        const mentionedMember = message.mentions.members.first();
        const ticket = await Ticket.findOne({ where: { channelId: message.channel.id}})

        if (!ticket) {
            message.channel.send(FUNC.Notify("This command can only be run in a ticket.", "red")).then(msg => {msg.delete({ timeout: 5000 })})
            return;
        }

        if (mentionedMember) {
            message.channel.updateOverwrite(mentionedMember, {VIEW_CHANNEL: true}).catch((err) => console.log(err));
            message.react('✅');
            FUNC.UpdateTicket(`${mentionedMember} was added to the ticket.`, ticket, null, message, message.author)
        }
    }
}