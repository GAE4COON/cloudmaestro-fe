import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState();
  const [isUploading, setIsUploading] = useState(false);  // 추가된 상태
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);  // 업로드 시작

      const fd = new FormData();
      fd.append("file", selectedFile);
      try {
        const response = await axios.post('http://localhost:8080/api/v1/file-api/upload', fd, {
          headers: {
            "Content-Type": `multipart/form-data; `,
          },
        });

        setData(response.data);
        
        if (response.data) {
          navigate('/draw', { state: { convert: response.data } });
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsUploading(false);  // 업로드 완료
      }
    }
  };

  const uploadFile = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  return {
    selectedFile,
    data,
    handleUpload,
    uploadFile
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
  
