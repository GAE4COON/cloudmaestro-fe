// import cryptoJs from 'crypto-js';
import CryptoJS from "crypto-js";

let randomBytes;

const secretKey =
  "dbd79e29c652e7133c3a813076606c09505b482246ce622bdab5f46be8a0c62a"; // 32자리 비밀키   key생성해야함
const iv = "abcdefghijklmnop"; // 16자리 iv

// Encryption using crypto-js
export const encrypt = async (data) => {
  const baseFile = await readFileAsBase64(data);

  const cipher = CryptoJS.AES.encrypt(baseFile, secretKey, {
    iv: CryptoJS.enc.Utf8.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // const encrypted = CryptoJS.AES.encrypt(baseFile, secretKey);

  return cipher.toString();
};

// Decryption using crypto-js
export const decrypt = (data) => {
  const decipher = CryptoJS.AES.decrypt(data, secretKey, {
    iv: CryptoJS.enc.Utf8.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // const decryptedBytes = CryptoJS.AES.decrypt(data, secretKey);
  const decryptedText = CryptoJS.enc.Utf8.stringify(decipher);

  const mimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // 예를 들어, .xlsx 파일의 경우의 MIME 타입
  const blob = base64ToBlob(decryptedText, mimeType);

  return blob;
};

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

function base64ToBlob(base64, mimeType = "") {
  // Base64 문자열을 바이너리 배열로 변환
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Blob 객체 생성
  return new Blob([byteArray], { type: mimeType });
}
