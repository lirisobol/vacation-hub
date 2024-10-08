import "./Routing.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import VacationsPage from "../../VacationArea/VacationsPage/VacationsPage";
import ReportsPage from "../../ReportsArea/ReportsPage/ReportsPage";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Page404 from "../page404/page404";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/vacations" element={<VacationsPage />} />
                <Route path="/reports" element={<ReportsPage />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
export default Routing;
