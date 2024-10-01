const sharp = require('sharp');

async function convertToPng(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .png()
            .toFile(outputPath);
    } catch (error) {
        console.error('Error converting image:', error);
    }
}

module.exports = {
    convertToPng
};
