import { useState } from 'react';
import axios from 'axios';

const CreateSTS = () => {
    const [formData, setFormData] = useState({
        wardNumber: '',
        capacity: '',
        locationId: '',
        longitude: '',
        latitude: ''
    });
    const [registerError, setRegisterError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/sts', formData);
            if (response.status === 201) {
                // Clear form data after successful registration
                setFormData({
                    wardNumber: '',
                    capacity: '',
                    locationId: '',
                    longitude: '',
                    latitude: ''
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
                            <span className="label-text">Ward Number</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ward Number"
                            name="wardNumber"
                            className="input input-bordered"
                            value={formData.wardNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Capacity</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Capacity"
                            name="capacity"
                            className="input input-bordered"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Location ID</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Location ID"
                            name="locationId"
                            className="input input-bordered"
                            value={formData.locationId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Longitude</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Longitude"
                            name="longitude"
                            className="input input-bordered"
                            value={formData.longitude}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Latitude</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Latitude"
                            name="latitude"
                            className="input input-bordered"
                            value={formData.latitude}
                            onChange={handleChange}
                            required
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

export default CreateSTS;
