import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fileUpload } from '../apis/fileAPI';
import CryptoJS from 'crypto-js';


export const useFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleInputFIleUpload = async () => {
    if (selectedFile) {

      const fd = new FormData();
      fd.append('file', selectedFile);
      console.log("fd", fd);

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

