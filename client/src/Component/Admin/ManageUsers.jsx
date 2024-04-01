import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    function getCookie(name) {
        const value = document.cookie;
        const parts = value.split(`${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const userId = getCookie('userId');
    // const roleId = getCookie('roleId');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users');
                setUsers(response.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/users/${userId}`);
            // Filter out the deleted user from the users array
            setUsers(users.filter(user => user.userId !== userId));
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Role</th>
                        <th>Branch</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.contact}</td>
                            <td>
                                {user.roleId === 1 && "Admin"}
                                {user.roleId === 2 && "StsManager"}
                                {user.roleId === 3 && "LandFillManager"}
                                {user.roleId === 4 && "Unassigned"}
                            </td>
                            <td>{user.branch}</td>
                            <td>
                                {userId != user.userId &&
                                    <Link to={`/dashboard/updateUser/${user.userId}`}>
                                        <button className="btn bg-lime-600 text-white">Update</button>
                                    </Link>
                                }
                            </td>
                            <td>
                                {userId != user.userId &&
                                    <button className="btn bg-red-600 text-white" onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-center mt-10'>
                <Link to="/dashboard/createUser"><button className="btn"> Create User</button></Link>
            </div>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default ManageUsers;
