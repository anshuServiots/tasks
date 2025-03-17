import { createBrowserRouter, Outlet , Navigate } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Login } from "./components/login";
import { EmployeeDashboard } from "./components/employee";

const AppRouter = createBrowserRouter(
    [
        {
            path : '/',
            element : <>
                <Navbar />              
                <Outlet />
            </> ,

            children : [
                {
                    path : 'login' , 
                    element : <Login /> 
                },
                {
                    path : 'employeeDashboard' , 
                    element : (
                        <ProtectedRoutes >
                            <EmployeeDashboard />
                        </ProtectedRoutes>
                    ),
                   
                }
            ]   
        }
    ]
)

function ProtectedRoutes({ children }: { children?: React.ReactNode }){
    //const Navigate = useNavigate()
    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/login" />; 
    }

    return children ? children : <Outlet />;  

}

export {AppRouter}