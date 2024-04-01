import { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        roleId: '',
        branch: '',
        contact: ''
    });
    const [registerError, setRegisterError] = useState('');
    // const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users', formData);
            if (response.status === 201) {
                // setSuccess('Registration successful!');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    roleId: '',
                    branch: '',
                    contact: ''
                });
                setRegisterError("");
            }
        } catch (error) {
            setRegisterError(error.response.data.message);
        }
    };

    return (
        <div className="max-w-screen-md mx-auto">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleRegister}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            className="input input-bordered"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="input input-bordered"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="input input-bordered"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Role ID</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Role ID"
                            name="roleId"
                            className="input input-bordered"
                            value={formData.roleId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Branch</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Branch"
                            name="branch"
                            className="input input-bordered"
                            value={formData.branch}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contact</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Contact"
                            name="contact"
                            className="input input-bordered"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
                {registerError && <p className="text-red-700">{registerError}</p>}
                
            </div>
        </div>
    );
};

export default CreateUser;
