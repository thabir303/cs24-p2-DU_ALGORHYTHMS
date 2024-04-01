import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageVehicles = () => {
    const [sts, setSTS] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/vehicles');
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
                        <th>Reg. No</th>
                        <th>Capacity</th>
                        <th>Type</th>
                        <th>fuelCostFullyLoaded</th>
                        <th>fuelCostFullyUnloaded</th>
                        <th>WardNumber</th>
                    </tr>
                </thead>
                <tbody>
                    {sts.map(user => (
                        <tr key={user._id}>
                            <td>{user.registrationNumber}</td>
                            <td>{user.capacity}</td>
                            <td>{user.type}</td>
                            <td>{user.fuelCostFullyLoaded}</td>
                            <td>{user.fuelCostUnloaded}</td>
                            <td>{user.wardNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-center mt-10'>
                <Link to="/dashboard/createVehicle"><button className="btn"> Create Vehicle</button></Link>
            </div>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default ManageVehicles;
