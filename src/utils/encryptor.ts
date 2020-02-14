// AES Encryption/Decryption with AES-256-GCM using random Initialization Vector + Salt
// ----------------------------------------------------------------------------------------
// the encrypted datablock is base64 encoded for easy data exchange.
// if you have the option to store data binary save consider to remove the encoding to reduce storage size
// ----------------------------------------------------------------------------------------
// format of encrypted data - used by this example. not an official format
//
// +--------------------+-----------------------+----------------+----------------+
// | SALT               | Initialization Vector | Auth Tag       | Payload        |
// | Used to derive key | AES GCM XOR Init      | Data Integrity | Encrypted Data |
// | 64 Bytes, random   | 16 Bytes, random      | 16 Bytes       | (N-96) Bytes   |
// +--------------------+-----------------------+----------------+----------------+
//
// ----------------------------------------------------------------------------------------
// Input/Output Vars
//
// MASTERKEY: the key used for encryption/decryption.
//            it has to be cryptographic safe - this means randomBytes or derived by pbkdf2 (for example)
// TEXT:      data (utf8 string) which should be encoded. modify the code to use Buffer for binary data!
// ENCDATA:   encrypted data as base64 string (format mentioned on top)

import crypto, { CipherGCM, DecipherGCM } from 'crypto';

export const encrypt = (text: string, masterkey: Buffer | string): string => {
    // random initialization vector
    const iv: Buffer = crypto.randomBytes(64);

    // random salt
    const salt: Buffer = crypto.randomBytes(128);

    // derive encryption key: 32 byte key length
    // in assumption the masterkey is a cryptographic and NOT a password there is no need for
    // a large number of iterations. It may can replaced by HKDF
    // the value of 2145 is randomly chosen!
    const key: Buffer = crypto.pbkdf2Sync(masterkey, salt, 2145, 32, 'sha512');

    // AES 256 GCM Mode
    const cipher: CipherGCM = crypto.createCipheriv('aes-256-gcm', key, iv);

    // encrypt the given text
    const encrypted: Buffer = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);

    // extract the auth tag
    const tag: Buffer = cipher.getAuthTag();

    // generate output
    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
};

export const decrypt = (encdata: string, masterkey: Buffer | string): string => {
    // base64 decoding
    const bData: Buffer = Buffer.from(encdata, 'base64');

    // convert data to buffers
    const salt: Buffer = bData.slice(0, 128);
    const iv: Buffer = bData.slice(128, 192);
    const tag: Buffer = bData.slice(192, 208);
    const text: Buffer = bData.slice(208);

    // derive key using; 32 byte key length
    const key: Buffer = crypto.pbkdf2Sync(masterkey, salt, 2145, 32, 'sha512');

    // AES 256 GCM Mode
    const decipher: DecipherGCM = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    // decrypt the given text
    const decrypted: string = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');

    return decrypted;
};
