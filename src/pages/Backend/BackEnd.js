import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Back() {
    const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/ec2/all')
            .then(response => setHello(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            백엔드에서 가져온 데이터입니다 : {JSON.stringify(hello)}
        </div>
    );
}

export default Back;