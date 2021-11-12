const crypto = require('crypto');
const data = require('../../static-files/data.json');

const encryptMessage = () => {
    let originalMessage = {
        name: data.names[Math.floor(Math.random() * data.names.length)],
        origin: data.cities[Math.floor(Math.random() * data.cities.length)],
        destination: data.cities[Math.floor(Math.random() * data.cities.length)]
    }

    let originalMessageWithHash = Object.assign({}, originalMessage, { secret_key: crypto.createHash('sha256').update(JSON.stringify(originalMessage)).digest('hex') });

    const algorithm = 'aes-256-ctr';
    const secretKey = 'PdSgVkYp3s6v9y$B&E)H+MbQeThWmZq4';
    const iv = 'smartjoulesiv123';

    let cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    let encryptedMessage = Buffer.concat([cipher.update(JSON.stringify(originalMessageWithHash)), cipher.final()]).toString('hex');

    return encryptedMessage;
}

const generateEncryptedPayload = () => {
    let min = 49;
    let max = 499;
    let random = Math.floor((Math.random() * (max - min) + min));
    let encryptedPayload = "";
    for (let i = 0; i < random; i++) {
        encryptedPayload += encryptMessage() + '|';
    }
    encryptedPayload = encryptedPayload.substring(0, encryptedPayload.length - 1); // to remove the last pipe ('|') symbol
    return encryptedPayload;
}

module.exports = {
    generateEncryptedPayload
}