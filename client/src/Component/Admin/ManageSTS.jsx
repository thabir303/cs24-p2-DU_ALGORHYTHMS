import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageSTS = () => {
    const [sts, setSTS] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/sts');
                setSTS(response.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        fetchUsers();
    }, []);


    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>ward</th>
                        <th>capacity</th>
                        <th>locationId</th>
                        <th>longitude</th>
                        <th>latitude</th>
                    </tr>
                </thead>
                <tbody>
                    {sts.map(user => (
                        <tr key={user._id}>
                            <td>{user.wardNumber}</td>
                            <td>{user.capacity}</td>
                            <td>{user.locationId}</td>
                            <td>{user.longitude}</td>
                            <td>{user.latitude}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-center mt-10'>
                <Link to="/dashboard/createSTS"><button className="btn"> Create STS</button></Link>
            </div>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default ManageSTS;
