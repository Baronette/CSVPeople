import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Home = () => {

    const [people, setPeople] = useState();

    useEffect(() => {
        const getPeople = async () => {
            const { data } = await axios.get('api/people/getpeople');
            setPeople(data);
        }
        getPeople();
    }, [])
    const onDeleteClick = () => {
        axios.post('api/people/deleteall');
        setPeople();
    }
    return (
        <div className='container col-md-10'>
            <button className='btn btn-danger btn-outline mt-2 mb-2' onClick={onDeleteClick}>Delete All</button>
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {people && people.map(p => {
                        return (<tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.firstName}</td>
                            <td>{p.lastName}</td>
                            <td>{p.age}</td>
                            <td>{p.address}</td>
                            <td>{p.email}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Home;