import "./Login.css";
import { useEffect } from "react";
import { useNavigate , NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import { AppState } from "../../../Redux/AppState";
import CredentialsModel from "../../../Models/CredentialsModel";
import loginImage from "../../../Assets/Images/login-image.jpg";
import brandLogo from "../../../Assets/Images/logo-2.png";

function Login(): JSX.Element {
    // Initiate current user from redux
    const user = useSelector((state: AppState) => state.user);
    // Form State, handling submission and errors
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>({
        // Validation Mode
        mode: "onTouched"
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        // If user is already logged in, redirect to home
        if (user) {
            notify.success(`Welcome Back ${user.firstName} ${user.lastName}`)
            navigate("/home");
        }
    }, [user, navigate]);

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            navigate("/home"); 
        } 
        catch (err: any) {            
            notify.error(err); 
        }
    }
    return (
        <div className="Login d-flex justify-content-center align-items-center fade-in-fast">
            <div className="container border rounded shadow bg-body-tertiary rounded">
                <div className="row">
                    <div className="col-md-6 p-3 d-flex align-items-center justify-content-center">
                    <form onSubmit={handleSubmit(send)} className="form-container">
                        
                            <div className="testing-credentials d-flex flex-column p-3 mb-3 rounded shadow-sm">
                                <span className="fs-5">Admin Credentials For Testing</span>
                                <span className="fs-6">admin@test.com</span>
                                <span className="fs-6">123123</span>
                            </div>
                            <div className="testing-credentials d-flex flex-column p-3 mb-3 rounded shadow-sm">
                                <span className="fs-5">User Credentials For Testing</span>
                                <span className="fs-6">user@test.com</span>
                                <span className="fs-6">123123</span>
                            </div>

                            <img src={brandLogo} alt="Brand Logo" className="mb-4" style={{ width: '80px' }} />

                            <input type="email" className="form-control p-3 mb-3" placeholder="Email Address" autoComplete="username" {...register("email", CredentialsModel.emailValidation)} />
                            {errors.email && <div className="alert alert-danger">{errors.email.message}</div>}

                            <input type="password" className="form-control p-3 mb-3" placeholder="Password" autoComplete="password" {...register("password", CredentialsModel.passwordValidation)} />
                            {errors.password && <div className="alert alert-danger">{errors.password.message}</div>}
                            
                            <button className="btn btn-outline-dark w-100 p-2 mb-3 rounded-pill">Sign In</button>
                            <NavLink to={"/register"} className="text-info">Not A Member? Click Here To Sign Up</NavLink>
                        </form>
                    </div>
                    <div className="col-md-6 d-none d-md-block m-0 p-0">
                        <img src={loginImage} alt="Login" className="img-fluid rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
