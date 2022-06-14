import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Generate = () => {
    const [count, setCount] = useState();
    const history = useHistory();

    const onSubmitClick = async () => {
        console.log(count)
        await window.location.replace(`https://localhost:5001/api/people/generate/${count}`);
        history.push('/')
    }
    return (
        <div className='container col-md-3 '>
            <form onSubmit={onSubmitClick} className='card card-body mt-5 bg-secondary '>
                <h3>Generate People</h3>
                <input type="text" className='form-control mt-2' placeholder='Enter Number'
                    name='count' onChange={e => setCount(e.target.value)} />
                <button className='btn btn-outline btn-dark mt-2'>Generate</button>
            </form>
        </div>
    )
}
export default Generate;

