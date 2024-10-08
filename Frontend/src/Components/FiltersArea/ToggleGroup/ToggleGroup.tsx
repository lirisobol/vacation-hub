import "./ToggleGroup.css";import {useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../../../Redux/Store";
import { AppState } from "../../../Redux/AppState";
import { filterActionCreators } from "../../../Redux/Slices/FilterSlice";
import { applyFilter } from "../../../Redux/Actions/FilterActions";
import { UserRole } from '../../../Models/UserRole';

function ToggleGroup(): JSX.Element {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const dispatch = useAppDispatch();
    const user = useSelector((state: AppState) => state.user);
    const isAdmin = user.role === UserRole.Admin; // Adjust this check based on how admin is determined in your app

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filterValue = event.target.value;

        // Toggle off if the same filter is clicked again
        if (filterValue === selectedFilter) {
            setSelectedFilter(null);
            dispatch(filterActionCreators.resetFilter());
            (dispatch as any)(applyFilter(null)); // dispatching without declaring 'any' caused problems with redux thunks types.
        } 
        else {
            setSelectedFilter(filterValue);
            dispatch(filterActionCreators.setFilter(filterValue));
            (dispatch as any)(applyFilter(filterValue)); // dispatching without declaring 'any' caused problems with redux thunks types.
        }
    };

    return (
        // Users - Showing 3 filters and hiding 'Add Vacation' button.
        // Admins - Hiding 'Liked' Filter and showing 'Add Vacation' button.
        <div className="btn-group m-1" role="group" aria-label="Vacation filter toggle group">
            <input
                type="checkbox"
                className="btn-check"
                id="filter-future"
                value="FUTURE"
                checked={selectedFilter === "FUTURE"}
                onChange={handleFilterChange}
                autoComplete="off"
            />
            <label className="btn btn-outline-dark" htmlFor="filter-future">
                Future Vacations
            </label>

            {!isAdmin && (
                <>
                    <input
                        type="checkbox"
                        className="btn-check"
                        id="filter-liked"
                        value="LIKED"
                        checked={selectedFilter === "LIKED"}
                        onChange={handleFilterChange}
                        autoComplete="off"
                    />
                    <label className="btn btn-outline-dark" htmlFor="filter-liked">
                        Liked Vacations
                    </label>
                </>
            )}

            <input
                type="checkbox"
                className="btn-check"
                id="filter-active"
                value="ACTIVE"
                checked={selectedFilter === "ACTIVE"}
                onChange={handleFilterChange}
                autoComplete="off"
            />
            <label className="btn btn-outline-dark" htmlFor="filter-active">
                Ongoing Vacations
            </label>
        </div>
    );
}

export default ToggleGroup;
