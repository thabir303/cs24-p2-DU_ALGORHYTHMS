import { Sidebar } from "flowbite-react";
import { HiChartPie, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Link, Outlet } from "react-router-dom";
// import useAdmin from "./hooks/useAdmin";
const DashBoard = () => {
    // const { user } = useContext(AuthContext);

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
    const isAdmin = roleId == 1
    const isStsManager = roleId == 2
    const isLandFillManager = roleId == 3
    const isUser = roleId == 4

    return (
        <div className="flex">
            <div className="sticky">
                <Sidebar aria-label="Default sidebar example">
                    <Sidebar.Items>
                        {
                            (isAdmin && <>
                                <Sidebar.ItemGroup>
                                    <Link to="/dashBoard/adminProfile"><Sidebar.Item icon={HiUser}>
                                        Admin Profile
                                    </Sidebar.Item></Link>
                                    <Link to="/dashBoard/manageUsers"><Sidebar.Item icon={HiViewBoards} >
                                        Manage Users
                                    </Sidebar.Item></Link>
                                    <Link to="/dashBoard/manageUsers"><Sidebar.Item icon={HiViewBoards} >
                                        Manage Roles
                                    </Sidebar.Item></Link>
                                    <Link to="/dashBoard/manageSts"><Sidebar.Item icon={HiViewBoards} >
                                        Manage STS
                                    </Sidebar.Item></Link>
                                    <Link to="/dashBoard/manageLandFill"><Sidebar.Item icon={HiViewBoards} >
                                        Manage LandFill
                                    </Sidebar.Item></Link>
                                    <Link to="/dashBoard/manageVehicles"><Sidebar.Item icon={HiViewBoards} >
                                        Manage Vehicles
                                    </Sidebar.Item></Link>
                                    <Link to="/dashBoard/statistics"><Sidebar.Item icon={HiViewBoards} >
                                        Statistics
                                    </Sidebar.Item></Link>
                                </Sidebar.ItemGroup>
                            </>) ||
                            (isStsManager &&
                                <>
                                    <Sidebar.ItemGroup>
                                        <Link to="/dashBoard/stsManagerProfile"><Sidebar.Item icon={HiUser}>
                                            StsManager Profile
                                        </Sidebar.Item></Link>
                                        <Link to="/dashBoard/generateBill"><Sidebar.Item icon={HiViewBoards} >
                                            Generate Bill
                                        </Sidebar.Item></Link>
                                        <Link to="/dashBoard/getRoute"><Sidebar.Item icon={HiViewBoards} >
                                            Get Route
                                        </Sidebar.Item></Link>

                                    </Sidebar.ItemGroup>
                                </>) ||
                            (isLandFillManager &&
                                <>
                                    <Sidebar.ItemGroup>
                                        <Link to="/dashBoard/landFillManagerProfile"><Sidebar.Item icon={HiUser}>
                                            StsManager Profile
                                        </Sidebar.Item></Link>

                                    </Sidebar.ItemGroup>
                                </>)
                            || (isUser &&
                                <Sidebar.ItemGroup>
                                    <Link to="/dashBoard/myProfile"><Sidebar.Item icon={HiUser}>
                                        My Profile
                                    </Sidebar.Item></Link>
                                    <Link to="/dashBoard/myReviews"><Sidebar.Item icon={HiChartPie}>
                                        My Reviews
                                    </Sidebar.Item></Link>
                                </Sidebar.ItemGroup>)
                        }

                        <Sidebar.ItemGroup>
                            <Link to='/'>
                                <Sidebar.Item icon={HiTable}>
                                    Home
                                </Sidebar.Item>
                            </Link>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default DashBoard;