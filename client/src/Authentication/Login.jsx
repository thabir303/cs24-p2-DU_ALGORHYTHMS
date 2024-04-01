import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
        
            const data = await response.json();
            console.log(data);
        
            if (response.ok) {
                document.cookie = `userId=${data.userId}; path=/`; // Set userId cookie
                document.cookie = `roleId=${data.roleId}; path=/`; // Set roleId cookie
                document.cookie = `token=${data.token}; path=/`; // Set token cookie
                setSuccess('');
                navigate('/');
            } else {
                setSuccess(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        
    };
    
    function getCookie(name) {
        const value = document.cookie;
        const parts = value.split(`${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const userId = getCookie('userId');
    const roleId = getCookie('roleId');
    if (userId && roleId) {
        console.log('User ID:', userId);
        console.log('Role ID:', roleId);
    }

    return (
        <div>
            <div className="hero min-h-screen mb-10">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center flex justify-center w-1/2 lg:text-left">
                        <img className="w-2/3" src="https://i.ibb.co/26gjbfg/6310507.jpg" alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full  max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            </div>
                            {
                                success && <p className="text-red-600">{success}</p>
                            }
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
