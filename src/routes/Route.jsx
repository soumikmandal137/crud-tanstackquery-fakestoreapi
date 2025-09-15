import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/landing/Home";
import Login from "../pages/landing/Login";
import Signup from "../pages/landing/Signup";
import LoginAdmin from "../pages/admin/Login";
import SignupAdmin from "../pages/admin/Signup";
import PrivateRoute from "../components/PrivateRoute";
import Wrapper from "../layout/admin/Wrapper";
import Product from "../pages/admin/product/Product";
import AddProduct from "../pages/admin/product/AddProduct";
import AddUser from "../pages/admin/users/AddUser";
import Users from "../pages/admin/users/Users";

const Route = createBrowserRouter([
  //landing routes
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  //admin
  {
    path: "/admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "/admin/signup",
    element: <SignupAdmin />,
  },
  {
    path: "/admin/main",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Wrapper />,
        children: [
          {
            path: "productlist",
            element: <Product />,
          },
          {
            path: "productadd",
            element: <AddProduct />,
          },
          {
            path: "productedit/:id",
            element: <AddProduct />,
          },
          
        
          {
            path: "userlist",
            element: <Users />,
          },
          {
            path: "useradd",
            element: <AddUser />,
          },
          {
            path: "useredit/:id",
            element: <AddUser />,
          },
        ],
      },
    ],
  },
]);

export default Route;
