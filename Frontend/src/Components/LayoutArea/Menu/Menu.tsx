import './Menu.css'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../../Redux/AppState';
import { UserRole } from '../../../Models/UserRole';

import logo from '../../../Assets/Images/logo-2.png';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

function Menu(): JSX.Element {
    // Get user from Redux 'user' state
    const user = useSelector((state: AppState) => state.user);

    // Checks if a 'user' exists, and if he's admin or not.
    const isAdmin = user && user.role === UserRole.Admin;
    const userIcon = isAdmin ? <AdminPanelSettingsRoundedIcon /> : <SupervisedUserCircleRoundedIcon />;

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/home">
                    <img src={logo} alt="Brand" height="50" />
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* If User */}
                        {user && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/vacations">Vacations</NavLink>
                                </li>
                                {/* If Admin */}
                                {isAdmin && (
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/reports">Reports</NavLink>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                    <div className="d-flex align-items-center justify-content-evenly m-1">
                        {/* If User - Show details + role */}
                        {user ? (
                            <div className="user-details d-flex gap-2 me-3">
                                <span className='user-name'>{user.firstName} {user.lastName}</span>
                                <span className='role-icon'>{userIcon}</span>
                                <span className='role-text'>{isAdmin ? "Admin" : "User"}</span>
                            </div>
                        ) : null}

                        {/* if user - show 'Sign Out' ,navigate to logout.
                            if guest - show 'Sign In' ,navigate to login.
                        */}
                        <NavLink to={user ? "/logout" : "/login"}>
                            <button className="btn btn-outline-dark">
                                {user ? "Sign Out" : "Sign In"}
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
