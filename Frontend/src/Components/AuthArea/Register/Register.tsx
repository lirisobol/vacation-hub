import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authService } from "../../../Services/AuthService";
import { notify } from "../../../Utils/Notify";
import UserModel from "../../../Models/UserModel";
import registerImage from "../../../Assets/Images/register-image.jpg";
import brandLogo from "../../../Assets/Images/logo-2.png";

function Register(): JSX.Element {
    // Form State, handling submission and errors
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>({
        mode: "onTouched" // Validation will trigger on the blur event
    });
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notify.success(`Welcome ${user.firstName} ${user.lastName}`);
            navigate("/home");
        } 
        catch (err: any) {
            notify.error(err.message);
        }
    }

    return (
        <div className="Register d-flex justify-content-center align-items-center fade-in-fast">
            <div className="container border rounded shadow bg-body-tertiary rounded">
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <form onSubmit={handleSubmit(send)} className="form-container">
                            <img src={brandLogo} alt="Brand Logo" className="mb-4" style={{ width: '80px' }} />
                            <input type="text" className="form-control p-3 mb-3" placeholder="First Name" {...register("firstName", UserModel.firstNameValidation)} />
                            {errors.firstName && <div className="alert alert-danger">{errors.firstName.message}</div>}

                            <input type="text" className="form-control p-3 mb-3" placeholder="Last Name" {...register("lastName", UserModel.lastNameValidation)} />
                            {errors.lastName && <div className="alert alert-danger">{errors.lastName.message}</div>}

                            <input type="email" className="form-control p-3 mb-3" placeholder="Email Address" {...register("email", UserModel.emailValidation)} />
                            {errors.email && <div className="alert alert-danger">{errors.email.message}</div>}

                            <input type="password" className="form-control p-3 mb-3" placeholder="Password" autoComplete="password" {...register("password", UserModel.passwordValidation)} />
                            {errors.password && <div className="alert alert-danger">{errors.password.message}</div>}

                            <button className="btn btn-outline-dark w-100 p-2 mb-3 rounded-pill">Sign Up</button>
                            <NavLink to={"/login"} className="text-info">Already A Member? Sign In Here</NavLink>
                        </form>
                    </div>
                    <div className="col-md-6 d-none d-md-block m-0 p-0">
                        <img src={registerImage} alt="Register" className="img-fluid rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
