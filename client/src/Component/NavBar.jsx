import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = getCookie('userId');
        const roleId = getCookie('roleId');
        setIsLoggedIn(userId && roleId);
    }, []);

    function getCookie(name) {
        const value = document.cookie;
        const parts = value.split(`${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleLogOut = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/logout", {
                method: "POST",
                credentials: "include" // Include cookies in the request
            });
            if (response.ok) {
                // Clear cookies on successful logout
                document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                document.cookie = 'roleId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                setIsLoggedIn(false);
                navigate('/auth/login');
            } else {
                console.error("Failed to logout");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const navLinks = (
        <>
            <li className="mr-1"><Link to='/'>Home</Link></li>
            {/* <li className="mr-1"><Link to='/'>Habijabi</Link></li> */}
            <li className="mr-1"><Link to='/dashboard'>Dashboard</Link></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 my-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <img src="logo.png" className="w-20" alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>
            <div className="navbar-end">
                {isLoggedIn ? (
                    <button onClick={handleLogOut} className="btn z">Log Out</button>
                ) : (
                    <Link to="/auth/login"><button className="btn z">Log In</button></Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
