import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    function getCookie(name) {
        const value = document.cookie;
        const parts = value.split(`${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const userId = getCookie('userId');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : user ? (
                <div className="max-w-screen-md mx-auto">
                    <p>User ID: {user.userId}</p>
                    <p>Name: {user.username}</p>
                    <p>contact: {user.contact}</p>
                    <p>email: {user.email}</p>
                    <p>roleId: {user.roleId}</p>
                    <p>branch: {user.branch}</p>
                    <Link to="/dashboard/updateAdminProfile"><button className="btn"> Update</button></Link>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminProfile;
