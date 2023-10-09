import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useExampleFile = () => {
    const navigate = useNavigate();

    const getExampleFile = async (order) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/file-api/example/${order}`);  // 백틱 사용

            if (response.data) {
                console.log(response.data);
                navigate('/draw', { state: { file: response.data } });
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return {   // 이 부분을 함수 밖으로 이동
        getExampleFile
    };
};
