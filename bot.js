const TelegramBot = require('node-telegram-bot-api');
const { token } = require('./config');
const { handleStickerMessage, handleStickerSetDownload } = require('./downloadSticker');
const handleInlineQuery = require('./inlineQueryHandler');

const bot = new TelegramBot(token, { polling: true });

// Handle sticker messages
bot.on('message', (msg) => {
    if (msg.sticker) {
        handleStickerMessage(bot, msg);
    } else {
        bot.sendMessage(msg.chat.id, 'Please send a sticker.');
    }
});

// Handle sticker set downloads
bot.onText(/\/download (.+)/, (msg, match) => {
    handleStickerSetDownload(bot, msg, match);
});

// Handle inline queries
bot.on('inline_query', (query) => {
    handleInlineQuery(bot, query);
});

module.exports = bot;
