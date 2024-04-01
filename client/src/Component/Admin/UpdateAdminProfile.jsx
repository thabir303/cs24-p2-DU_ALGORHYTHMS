import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateAdminProfile = () => {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userId = getCookie('userId');

    function getCookie(name) {
        const value = document.cookie;
        const parts = value.split(`${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.put(`http://localhost:8080/users/${userId}`, {
                username: name, // Assuming 'name' corresponds to 'username'
                contact
            });
            if (response.status === 200) {
                console.log(response.data);
                navigate("/dashboard/adminProfile");
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="max-w-screen-md mx-auto">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleUpdateProfile}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            className="input input-bordered"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contact</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Contact"
                            name="contact"
                            className="input input-bordered"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAdminProfile;
