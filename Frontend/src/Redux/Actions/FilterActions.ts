import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../AppState';
import VacationModel from '../../Models/VacationModel';

// Async thunk for applying filters to the vacations.
export const applyFilter = createAsyncThunk(
    'vacations/applyFilter', // Action type prefix.
    async (filterType: string, thunkAPI) => {

        const allVacations = (thunkAPI.getState() as AppState).vacations.allVacations; // Access the current state.
        
        let filteredVacations: VacationModel[] = [];
        
        const currentDate = new Date();
        
        switch (filterType) {
            case "LIKED": // Filter to show only liked vacations.
                filteredVacations = allVacations.filter(vacation => vacation.isLiked);
                break;
            case "ACTIVE": // Filter to show vacations that are currently active.
                filteredVacations = allVacations.filter(vacation => {
                    const startDate = new Date(vacation.startDate);
                    const endDate = new Date(vacation.endDate);
                    return currentDate >= startDate && currentDate <= endDate;
                });
                break;
            case "FUTURE": // Filter to show future vacations.
                filteredVacations = allVacations.filter(vacation => {
                    const startDate = new Date(vacation.startDate);
                    return currentDate < startDate;
                });
                break;
            default: // If no filter type is matched, return all vacations.
                filteredVacations = allVacations;
                break;
        }
        return filteredVacations; // Return the filtered list of vacations.
    }
);
