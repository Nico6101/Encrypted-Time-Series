# Encrypted-Time-Series
a small backend application which can generate and emit an encrypted data stream over a socket, listens to incoming data stream on a socket, decrypts and decodes it, save to a time series dB and then emit the saved data.

# How it works

1. Run command 'node index.js' in listener folder.
2. Run command 'node index.js' in emitter folder.
3. The output contains decrypted users and will be displayed on console.

# Completed items
1. Rough Implementation of socket communication
2. Generation and encryption of messages as per the requirement and sent over socket by emitter
3. Encrypted messages received by listener
4. Message Decryption
5. Message Validation

# Remaining items
1. Formatting data to be stored in DB
2. Sending data every 10 seconds.
3. MONGODB operations
4. Creation of Docker application
5. Test cases
6. Code formatting