import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Root = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;