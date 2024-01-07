import {
    createBrowserRouter,
    BrowserRouter // Add this line
} from "react-router-dom";


import Home from "../LayOut/Home/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Step2 from "../Components/Register/Step2";
import Step3 from "../Components/Register/Step3";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Dashboard from "../LayOut/Dashboard/Dashboard";

import PrivateRoute from "../Routes/PrivateRoute";
import AdminRoute from "../Routes/AdminRoute";

import AdminHome from "../LayOut/Dashboard/Components/AdminHome";
import AllUsers from "../LayOut/Dashboard/Components/ManageUsers/AllUsers";
import App from "../App";
import AddReview from "../LayOut/Dashboard/Components/Review/AddReview";
import ManageReview from "../LayOut/Dashboard/Components/Review/ManageReview";
import UsersInfo from "../LayOut/Dashboard/Components/UsersInfo/UsersInfo";
import EditReview from "../LayOut/Dashboard/Components/Review/EditReview";
import UserHome from "../LayOut/User/UserHome";
import CreditScore from "../LayOut/User/Components/CreditSocre/CreditScore";
import PaymentHistory from "../LayOut/User/Components/PaymentHistory/PaymentHistory";
import ScoreHistory from "../LayOut/User/Components/ScoreHistory/ScoreHistory";
import Profile from "../LayOut/User/Components/Settings/Profile/Profile";
import Contact from "../LayOut/User/Components/Support/Contact/Contact";
import CreditMonitor from "../LayOut/User/Components/CreditMonitor/CreditMonitor";
import Payment from "../LayOut/User/Components/Payment/Payment";
import CheckoutForm from "../LayOut/User/Components/Payment/CheckoutForm";
import CustomerSupport from "../LayOut/Home/CustomerSupport/CustomerSupport";
import ManageContact from "../LayOut/Dashboard/Components/ManageContact/ManageContact";
import About from "../LayOut/Home/About/About";
import Insights from "../LayOut/Home/Insights/Insights";
import Product from "../LayOut/Home/Product/Product";
import Resourse from "../LayOut/Home/Resourse/Resourse";
import Service from "../LayOut/Home/Service/Service";
import ForgetPassword from "../Components/ForgetPassword/ForgetPassword";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>,
            },
            {
                path: 'register/step2',
                element: <Step2></Step2>
            },
            {
                path: 'register/step3',
                element: <Step3></Step3>
            },
            {
                path: 'customerSupport',
                element: <CustomerSupport></CustomerSupport>,
            },
            {
                path: 'about',
                element: <About></About>,
            },
            {
                path: 'insights',
                element: <Insights></Insights>,
            },
            {
                path: 'product',
                element: <Product></Product>,
            },
            {
                path: 'resourse',
                element: <Resourse></Resourse>,
            },
            {
                path: 'service',
                element: <Service></Service>,
            },
            {
                // error page
                path: '*',
                element: <ErrorPage></ErrorPage>,
            },
            {
                path: 'forgetPassword',
                element: <ForgetPassword></ForgetPassword>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            },
            // Admin Routs
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
            },
            {
                path: 'addReviews',
                element: <AdminRoute><AddReview></AddReview></AdminRoute>,
            },
            {
                path: 'manageReviews',
                element: <AdminRoute><ManageReview></ManageReview></AdminRoute>,
            },
            {
                path: 'customerSuport',
                element: <AdminRoute><ManageContact></ManageContact></AdminRoute>,
            },
            {
                path: 'editReviews/:id',
                element: <AdminRoute><EditReview></EditReview></AdminRoute>,
            },
            {
                path: 'userInfos',
                element: <AdminRoute><UsersInfo></UsersInfo></AdminRoute>,
            },

            // User Routs
            {
                path: 'userHome',
                element: <PrivateRoute><UserHome></UserHome></PrivateRoute>,
            },
            {
                path: 'credit-score',
                element: <PrivateRoute><CreditScore></CreditScore></PrivateRoute>,
            },
            {
                path: 'make-payment',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: 'score-monitor',
                element: <PrivateRoute><CreditMonitor></CreditMonitor></PrivateRoute>,
            },
            {
                path: 'checkout',
                element: <PrivateRoute><CheckoutForm></CheckoutForm></PrivateRoute>
            },
            {
                path: 'paymentHistory',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>,
            },
            {
                path: 'scoretHistory',
                element: <PrivateRoute><ScoreHistory></ScoreHistory></PrivateRoute>,
            },

            // error page
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: 'contact',
                element: <PrivateRoute><Contact></Contact></PrivateRoute>
            }
        ]
    }
]);

