import "./HeroSection.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";

export function HeroSection(): JSX.Element {
    const user = useSelector((state: AppState) => state.user);

    return (
        <div className="HeroSection d-flex justify-content-start p-2">
            <h1 className="title">VacationHUB</h1>
            <h5 className="short-phrase">The Ultimate Destination for Finding Your Perfect Getaway</h5>
            {user ? (
                // Button for logged-in users (and admins)
                <NavLink to="/vacations" className="btn btn-lg btn-dark p-3 m-3 rounded-pill">
                    Explore Vacations 
                </NavLink>
            ) : (
                // Button for guests
                <NavLink to="/login" className="btn btn-lg btn-dark p-3 m-3 rounded-pill">
                    Get Started
                </NavLink>
            )}
        </div>
    );
}
