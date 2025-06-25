import { createBrowserRouter } from "react-router";

import { Root } from "../layouts/Root";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import NotFoundPage from "../pages/NotFoundPage";
import MyProfile from "../components/profile/MyProfile";
import TermsAndConditions from "../components/footer/TermsAndConditions";
import PrivacyPolicy from "../components/footer/PrivacyPolicy";
import PrivateRoute from "../provider/PrivateRoute";
import ForgotPassword from "../components/ForgotPassword";
import PublicRoute from "../provider/PublicRoute";
import ProjectCreate from "../components/projects/ProjectCreate";
import MyTaskList from "../components/myTask/MyTaskList";
import ProjectEdit from "../components/projects/ProjectEdit";
import ProjectDetails from "../components/projects/ProjectDetails";
import BrowseTaskList from "../components/browseTask/BrowseTaskList";

export const Routes = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "login",
                element: <PublicRoute><Login /></PublicRoute>

            },
            {
                path: "register",
                element: <PublicRoute><Register /></PublicRoute>

            },
            {
                path: "my-profile",
                element: <PrivateRoute><MyProfile /></PrivateRoute>

            },
            {
                path: "add-task",
                element: <PrivateRoute><ProjectCreate /></PrivateRoute>

            },
            {
                path: "my-task",
                element: <PrivateRoute><MyTaskList /></PrivateRoute>

            },
            {
                path: "/task-details/",
                children: [

                    {
                        path: ":id",
                        element: <PrivateRoute><ProjectDetails /></PrivateRoute>
                    },
                ],
            },
            {
                path: "edit-task",
                element: <PrivateRoute><ProjectEdit /></PrivateRoute>
            },
            {
                path: "all-task",
                Component: BrowseTaskList
            },
            {
                path: "terms-and-conditions",
                Component: TermsAndConditions
            },
            {
                path: "privacy-policy",
                Component: PrivacyPolicy
            },
            {
                path: "forgot-password",
                Component: ForgotPassword
            },


        ],
    },
    {
        path: "/*",
        Component: NotFoundPage
    }
]);