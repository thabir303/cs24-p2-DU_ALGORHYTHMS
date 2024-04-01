import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Component/Root.jsx';
import Home from './Component/Home.jsx';
import Login from './Authentication/Login.jsx';
import DashBoard from './Component/Dashboard.jsx';
import AdminProfile from './Component/Admin/AdminProfile.jsx';
import UpdateAdminProfile from './Component/Admin/UpdateAdminProfile.jsx';
import ManageUsers from './Component/Admin/ManageUsers.jsx';
import CreateUser from './Component/Admin/CreateUser.jsx';
import ManageSTS from './Component/Admin/ManageSTS.jsx';
import ManageLandFill from './Component/Admin/ManageLandFill.jsx';
import GenerateBill from './Component/StsManager/GenerateBill.jsx';
import UpdateUser from './Component/Admin/UpdateUser.jsx';
import Statistics from './Component/Admin/Statistics.jsx';
import CreateSTS from './Component/Admin/CreateSTS.jsx';
import CreateLandFill from './Component/Admin/CreateLandFill.jsx';
import ManageVehicles from './Component/Admin/ManageVehicles.jsx';
import CreateVehicle from './Component/Admin/CreateVehicle.jsx';
import GetRoute from './Component/StsManager/GetRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/auth/login",
        element: <Login></Login>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashBoard></DashBoard>,
    children:[
      {
        path:"adminProfile",
        element: <AdminProfile></AdminProfile>
      },
      {
        path: "updateAdminProfile",
        element: <UpdateAdminProfile></UpdateAdminProfile>
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>
      },
      {
        path: "createUser",
        element: <CreateUser></CreateUser>
      },
      {
        path: "updateUser/:id",
        element: <UpdateUser></UpdateUser>
      },
      {
        path: "manageSts",
        element: <ManageSTS></ManageSTS>
      },
      {
        path: "manageLandFill",
        element: <ManageLandFill></ManageLandFill>
      },
      
      {
        path: "statistics",
        element: <Statistics></Statistics>
      },
      {
        path: "createSTS",
        element: <CreateSTS></CreateSTS>
      },
      {
        path: "createLandFill",
        element: <CreateLandFill></CreateLandFill>
      },
      {
        path: "manageVehicles",
        element: <ManageVehicles></ManageVehicles>
      },
      {
        path: "createVehicle",
        element: <CreateVehicle></CreateVehicle>
      },
      // sts
      {
        path: "generateBill",
        element: <GenerateBill></GenerateBill>
      },
      {
        path: "getRoute",
        element: <GetRoute></GetRoute>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
