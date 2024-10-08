import "./FiltersContainer.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { useAppDispatch } from "../../../Redux/Store";
import { formActionCreators } from "../../../Redux/Slices/FormModalSlice";
import ToggleGroup from "../ToggleGroup/ToggleGroup";
import { UserRole } from "../../../Models/UserRole";



function FiltersContainer(): JSX.Element {
    const user = useSelector((state: AppState) => state.user);
    const isAdmin = user.role === UserRole.Admin; 
    const dispatch = useAppDispatch();
    
    const handleAddVacationClick = () => {
        dispatch(formActionCreators.openAddModal());
    };
    return (
        <div className="FiltersContainer d-flex flex-row align-items-center justify-content-between p-1">
            {/* Toggle Group */}
            <div className="toggle-group-container">
                <ToggleGroup/>
            </div>

            {/* Conditionally Render Links for Admin */}
            <div className="admin-buttons">
                {isAdmin && (
                    <button onClick={handleAddVacationClick} className="btn btn-outline-dark rounded p-2">Add Vacation</button>
                )}

            </div>
        </div>
    );
}

export default FiltersContainer;
