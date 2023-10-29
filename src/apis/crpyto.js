import cryptoJs from 'crypto-js';
import crypto from 'crypto'; // Node.js 내장 모듈
//import { decrypt, encrypt } from './apis/crypto';

// const secretKey = '12345678901234567890123456789012' // 32자리 비밀키   key생성해야함
// const iv = 'abcdefghijklmnop' // 16자리 iv             

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
}

// 랜덤한 16바이트 iv 생성
const generateIv = () => {
    return crypto.randomBytes(16).toString('hex');
}

const secretKey = generateSecretKey(); // 랜덤 32자리 비밀키
const iv = generateIv(); // 랜덤 16자리 iv
// 암호화

export const encrypt = (text) => {
    const cipher = cryptoJs.AES.encrypt(text, cryptoJs.enc.Utf8.parse(secretKey), {
        iv: cryptoJs.enc.Utf8.parse(iv),
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC,
    });

    return cipher.toString();
}

// 복호화
export const decrypt = (encryptedText) => {
    const decipher = cryptoJs.AES.decrypt(encryptedText, cryptoJs.enc.Utf8.parse(secretKey), {
        iv: cryptoJs.enc.Utf8.parse(iv),
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC,
    })

    return decipher.toString(cryptoJs.enc.Utf8);
}