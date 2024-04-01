import { useState } from 'react';
import axios from 'axios';

const CreateVehicle = () => {
    const [formData, setFormData] = useState({
        registrationNumber: '',
        type: '',
        capacity: '',
        fuelCostFullyLoaded: '',
        fuelCostUnloaded: '',
        wardNumber: ''
    });
    const [registerError, setRegisterError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/vehicles', formData);
            if (response.status === 201) {
                // Clear form data after successful registration
                setFormData({
                    registrationNumber: '',
                    type: '',
                    capacity: '',
                    fuelCostFullyLoaded: '',
                    fuelCostUnloaded: '',
                    wardNumber: ''
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
                            <span className="label-text">Registration Number</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Registration Number"
                            name="registrationNumber"
                            className="input input-bordered"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Type</span>
                        </label>
                        <select
                            name="type"
                            className="select select-bordered"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="openTruck">Open Truck</option>
                            <option value="dumpTruck">Dump Truck</option>
                            <option value="compactor">Compactor</option>
                            <option value="container">Container</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Capacity</span>
                        </label>
                        <select
                            name="capacity"
                            className="select select-bordered"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Capacity</option>
                            <option value="3000">3000</option>
                            <option value="5000">5000</option>
                            <option value="7000">7000</option>
                            <option value="15000">15000</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Fuel Cost Fully Loaded</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Fuel Cost Fully Loaded"
                            name="fuelCostFullyLoaded"
                            className="input input-bordered"
                            value={formData.fuelCostFullyLoaded}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Fuel Cost Unloaded</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Fuel Cost Unloaded"
                            name="fuelCostUnloaded"
                            className="input input-bordered"
                            value={formData.fuelCostUnloaded}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Ward Number</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Ward Number"
                            name="wardNumber"
                            className="input input-bordered"
                            value={formData.wardNumber}
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

export default CreateVehicle;
