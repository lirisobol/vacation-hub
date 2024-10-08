import "./Logout.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";

function Logout(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        authService.logout();
        notify.error(`See You Soon !`)
        navigate('/login');
    }, [navigate]);

    return <div>Logging out...</div>;
}

export default Logout;
