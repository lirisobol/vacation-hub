import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import VacationModel from '../../Models/VacationModel';
import { likeVacation, unlikeVacation } from '../Actions/LikeActions';
import { applyFilter } from '../Actions/FilterActions';
import { notify } from '../../Utils/Notify';


// Interface to describe the Vacation State.
export interface VacationState {
    allVacations: VacationModel[]; // Vacations object to store the vacations data fetched from backend
    visibleVacations: VacationModel[]; // Vacations object to store the filtered vacation list displayed in front.
}

// Set initial states
const initialState: VacationState = {
    allVacations: [],
    visibleVacations: []
};

const vacationSlice = createSlice({
    name: 'vacations',
    initialState,
    reducers: {
        // Sets both allVacations and visibleVacations to the payload, effectively resetting any filters that might have been applied.
        setAllVacations(state, action: PayloadAction<VacationModel[]>) {
            state.allVacations = action.payload;
            state.visibleVacations = action.payload;
        },

        // Adds new vacation to the arrays.
        addVacation(state, action: PayloadAction<VacationModel>) {
            state.allVacations.push(action.payload);
            state.visibleVacations.push(action.payload);
        },

        updateVacation(state, action: PayloadAction<VacationModel>) {
            // find the index of the vacation to update in the allVacations array.
            // The `findIndex` method returns the index of the first element in the array that satisfies the condition.
            const index = state.allVacations.findIndex(v => v._id === action.payload._id);
        
            // Check if the vacation was found in the allVacations array (index !== -1 means it was found).
            if (index !== -1) {
                // Update the vacation at the found index with the new vacation data from the action payload.
                state.allVacations[index] = action.payload;
        
                // find the index of the same vacation in the visibleVacations array.
                const visibleIndex = state.visibleVacations.findIndex(v => v._id === action.payload._id);
        
                // Check if the vacation was found in the visibleVacations array.
                if (visibleIndex !== -1) {
                    // If found, update the vacation at the found index with the new data from the action payload.
                    state.visibleVacations[visibleIndex] = action.payload;
                }
            }
        },
        deleteVacation(state, action: PayloadAction<string>) {
            state.allVacations = state.allVacations.filter(v => v._id !== action.payload);
            state.visibleVacations = state.visibleVacations.filter(v => v._id !== action.payload);
        },
        // Directly sets the visibleVacations to a new array. used for applying filters.
        setVisibleVacations(state, action: PayloadAction<VacationModel[]>) {
            state.visibleVacations = action.payload;
        },
        // Directly sets the visibleVacations to a new array, used for applying filters.
        resetVisibleVacations(state) {
            state.visibleVacations = state.allVacations;
        },
    },
    extraReducers: (builder) => {
        builder
            // uses Redux Toolkit's .addCase() method to handle state changes based on the fulfillment of asynchronous thunk actions 

        // Handling after a like operation has been successfully completed
        .addCase(likeVacation.fulfilled, (state, action) => {
            // Function to update the like state within a given list of vacations
            const updateLikeState = (vacations: VacationModel[]) => {
                // Find the index of the vacation that matches the ID from the action payload
                const index = vacations.findIndex(v => v._id === action.payload);
                // Check if the vacation is found
                if (index !== -1) {
                    // Set isLiked to true for the specific vacation
                    vacations[index].isLiked = true;
                    // Increment the likes count, initialize to 0 if undefined, then add 1
                    vacations[index].likesCount = (vacations[index].likesCount || 0) + 1;
                }
            };
            // Apply the update to all vacations list
            updateLikeState(state.allVacations);
            // Apply the update to visible vacations list
            updateLikeState(state.visibleVacations);
        })

        // Handling after an unlike operation has been successfully completed
        .addCase(unlikeVacation.fulfilled, (state, action) => {
            // Function to update the unlike state within a given list of vacations
            const updateUnlikeState = (vacations: VacationModel[]) => {
                // Find the index of the vacation that matches the ID from the action payload
                const index = vacations.findIndex(v => v._id === action.payload);
                // Check if the vacation is found
                if (index !== -1) {
                    // Set isLiked to false for the specific vacation
                    vacations[index].isLiked = false;
                    // Decrement the likes count, ensure it does not fall below 0
                    vacations[index].likesCount = Math.max(0, (vacations[index].likesCount || 0) - 1);
                }
            };
            // Apply the update to all vacations list
            updateUnlikeState(state.allVacations);
            // Apply the update to visible vacations list
            updateUnlikeState(state.visibleVacations);
        })
        .addCase(likeVacation.rejected, (state, action) => {
            // Handle like action rejection...
            notify.error(action.error);
        })
        .addCase(unlikeVacation.rejected, (state, action) => {
            // Handle unlike action rejection...
            notify.error(action.error);
        })
        
        // Filter Thunks
        .addCase(applyFilter.fulfilled, (state, action) => {
            state.visibleVacations = action.payload; // Set visibleVacations with the filtered data
        });
    },
});

export const vacationActionCreators = vacationSlice.actions;
export const vacationReducersContainer = vacationSlice.reducer;
