const crypto = require('crypto');

const decryptMessage = (hash) => {

    const algorithm = 'aes-256-ctr';
    const secretKey = 'PdSgVkYp3s6v9y$B&E)H+MbQeThWmZq4';
    const iv = 'smartjoulesiv123';
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString();

    return decrpyted;
};

const decryptPayload = (payload) => {

    let payloadArr = payload.split('|');
    let decryptedPayload = "";
    payloadArr.forEach(message => {
        let decryptedMessage = decryptMessage(message);
        decryptedPayload = decryptedPayload + decryptedMessage + '|';
    });

    decryptedPayload = decryptedPayload.substring(0, decryptedPayload.length - 1); // to remove the last pipe ('|') symbol

    console.log(decryptedPayload);

    return decryptedPayload;
}

module.exports = {
    decryptPayload
}