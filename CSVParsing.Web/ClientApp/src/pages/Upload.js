import React, { useRef } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Upload = () => {

    const fileInputRef = useRef(null);
    const history = useHistory();

    const onUploadClick = async () => {
        const file = fileInputRef.current.files[0];
        const base64 = await toBase64(file);
        await axios.post('/api/people/upload', { base64 });
        history.push('/');
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return (
        <div className='container col-md-3 '>
            <div className='card card-body mt-5 bg-secondary '>
                <h3>Upload File</h3>
                <br />
                <input ref={fileInputRef} type="file" />
                <button className='btn btn-outline btn-dark mt-2' onClick={onUploadClick}>Upload</button>
            </div>
        </div>
    )
}
export default Upload;