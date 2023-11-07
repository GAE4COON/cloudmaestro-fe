import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fileUpload } from '../apis/file';
import { encrypt, decrypt } from '../apis/crpytoAPI';
import CryptoJS from 'crypto-js';


export const useFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const secretKey = 'dbd79e29c652e7133c3a813076606c09505b482246ce622bdab5f46be8a0c62a';

  // function encryptFileContent(base64String, secretKey) {
  //   const encrypted = CryptoJS.AES.encrypt(base64String, secretKey);
  //   return encrypted.toString();
  // }

  // function decryptData(encryptedContent, secretKey) {
  //   const decryptedBytes = CryptoJS.AES.decrypt(encryptedContent, secretKey);
  //   const decryptedText = CryptoJS.enc.Utf8.stringify(decryptedBytes);
  //   return decryptedText;
  // }

 

  const handleInputFIleUpload = async () => {
    if (selectedFile) {

      const fd = new FormData();

      const encrypted = await encrypt(selectedFile);// 암호화 함수를 사용하여 파일 내용 암호화
      // console.log("encrypted "+encrypted);

      const blob = decrypt(encrypted);  // 여기서의 decryptData 함수는 이전에 제공한 복호화 함수입니다.
      fd.append('file', blob);

      try {
        const response = await fileUpload(fd);
        if (response.data) {
          navigate('/draw', {
            state: { file: response.data },
            from: "inputNet"
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const uploadFileFormat = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  return {
    selectedFile,
    handleInputFIleUpload,
    uploadFileFormat
  };
};


export const useFileDownload = (url, fileName) => {
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return downloadFile;
};

