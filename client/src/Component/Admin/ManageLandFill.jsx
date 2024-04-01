
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageLandFill = () => {
    const [landfill, setLandFill] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/landfill');
                setLandFill(response.data);
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
                        <th>locationId</th>
                        <th>landfillId</th>
                        <th>longitude</th>
                        <th>latitude</th>
                    </tr>
                </thead>
                <tbody>
                    {landfill.map(user => (
                        <tr key={user._id}>
                            <td>{user.locationId}</td>
                            <td>{user.landfillId}</td>
                            <td>{user.longitude}</td>
                            <td>{user.latitude}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-center mt-10'>
                <Link to="/dashboard/createLandFill"><button className="btn"> Create LandFill</button></Link>
            </div>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default ManageLandFill;
