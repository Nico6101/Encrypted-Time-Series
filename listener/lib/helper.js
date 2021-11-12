const crypto = require('crypto');

const decryptMessage = (hash) => {

    const algorithm = 'aes-256-ctr';
    const secretKey = 'PdSgVkYp3s6v9y$B&E)H+MbQeThWmZq4';
    const iv = 'smartjoulesiv123';
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString();

    return decrpyted;
};

const validateMessage = (message) => {
    message = JSON.parse(message);
    let originalMessage = { name: message.name, origin: message.origin, destination: message.destination };
    let shaHash = crypto.createHash('sha256').update(JSON.stringify(originalMessage)).digest('hex');
    if (shaHash === message.secret_key) {
        return true;
    }
    else {
        return false;
    }
}

const decryptPayload = (payload) => {
    try {
        let payloadArr = payload.split('|');
        let decryptedPayload = "";
        let dataIntegrity = true;
        payloadArr.forEach(message => {
            let decryptedMessage = decryptMessage(message);
            let isMessageValid = validateMessage(decryptedMessage);
            if (!isMessageValid) dataIntegrity = false;
            decryptedPayload = decryptedPayload + decryptedMessage + '|';
        });

        if (!dataIntegrity) {
            throw new Error("Data integrity failed");
        }
        else {
            console.log("Data is valid");
        }
        decryptedPayload = decryptedPayload.substring(0, decryptedPayload.length - 1); // to remove the last pipe ('|') symbol

        console.log(decryptedPayload);

        // TODO: formatting data to be stored in DB

        return decryptedPayload;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    decryptPayload
}