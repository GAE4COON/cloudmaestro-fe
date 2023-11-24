import React, { useState } from 'react';

function FileEditorComponent() {
    const [fileContent, setFileContent] = useState('');
    const [editedContent, setEditedContent] = useState('');

    const handleFileRead = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        try {
            const fileData = await file.text();
            setFileContent(fileData);
            setEditedContent(fileData);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    const handleContentChange = (event) => {
        setEditedContent(event.target.value);
    };

    const handleFileSave = () => {
        const blob = new Blob([editedContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'edited_file.txt'; // 예시 파일명입니다. 실제 사용 시 원하는 파일명으로 변경하세요.
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div>d</div>
            <div>d</div>

            <input type="file" onChange={handleFileRead} />
            <textarea value={editedContent} onChange={handleContentChange} />
            <button onClick={handleFileSave}>Save File</button>
            <div>
                <strong>Original File content:</strong>
                <pre>{fileContent}</pre>
            </div>
        </div>
    );
}

export default FileEditorComponent;
