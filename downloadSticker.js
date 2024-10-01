const fetch = require('node-fetch');
const fs = require('fs');
const { convertToPng } = require('./utils/convert');

async function handleStickerMessage(bot, msg) {
    const chatId = msg.chat.id;
    const fileId = msg.sticker.file_id;
    
    const fileInfo = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${fileInfo.file_path}`;
    
    bot.sendMessage(chatId, 'Downloading sticker...');

    // Fetch and save the sticker file
    const response = await fetch(fileUrl);
    const buffer = await response.buffer();
    const fileName = `${fileId}.webp`;

    fs.writeFileSync(fileName, buffer);
    bot.sendMessage(chatId, `Sticker downloaded as ${fileName}`);

    // Optional: Convert to PNG
    const outputFileName = `${fileId}.png`;
    await convertToPng(fileName, outputFileName);
    bot.sendMessage(chatId, `Sticker also converted to PNG as ${outputFileName}`);
}

async function handleStickerSetDownload(bot, msg, match) {
    const chatId = msg.chat.id;
    const stickerSetName = match[1];

    try {
        const stickerSet = await bot.getStickerSet(stickerSetName);

        stickerSet.stickers.forEach(async (sticker) => {
            const fileId = sticker.file_id;
            const fileInfo = await bot.getFile(fileId);
            const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${fileInfo.file_path}`;
            
            const response = await fetch(fileUrl);
            const buffer = await response.buffer();
            const fileName = `${fileId}.webp`;
            fs.writeFileSync(fileName, buffer);
        });

        bot.sendMessage(chatId, 'Sticker pack downloaded.');
    } catch (error) {
        bot.sendMessage(chatId, 'Failed to download sticker pack.');
    }
}

module.exports = {
    handleStickerMessage,
    handleStickerSetDownload
};
