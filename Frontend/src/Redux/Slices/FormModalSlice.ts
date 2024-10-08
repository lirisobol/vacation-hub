import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the state specific to form modals
export interface FormModalState {
    showModal: boolean; // Controls visibility of the modal
    vacationId: string | null; // Holds the vacation ID for editing, null when adding a new vacation
    mode: 'add' | 'edit'; // Indicates whether the modal is in 'add' or 'edit' mode
}

// Initial state setup
const initialState: FormModalState = {
    showModal: false, // Initially, no modal is shown
    vacationId: null, // No vacation selected initially
    mode: 'edit', // Default to 'edit' mode, though it will be overridden when opening modals
};

// Slice configuration
const formModalSlice = createSlice({
    name: 'formModal', // Unique identifier for the slice
    initialState, // Set the initial state for this slice
    reducers: {
        openAddModal(state) {
            state.showModal = true; // Open the modal
            state.vacationId = null; // No specific vacation ID since it's for adding
            state.mode = 'add'; // Set mode to 'add'
        },
        closeAddModal(state) {
            if (state.mode === 'add') {
                state.showModal = false; // Only close if the mode is 'add'
                state.vacationId = null; // Clear the vacation ID on close
            }
        },
        openEditModal(state, action: PayloadAction<string>) {
            state.showModal = true; // Open the modal
            state.vacationId = action.payload; // Set the vacation ID to be edited
            state.mode = 'edit'; // Set mode to 'edit'
        },
        closeEditModal(state) {
            if (state.mode === 'edit') {
                state.showModal = false; // Only close if the mode is 'edit'
                state.vacationId = null; // Clear the vacation ID on close
            }
        },
    },
});

// Export the action creators and the reducer
export const formActionCreators = formModalSlice.actions;
export const formModalReducersContainer = formModalSlice.reducer;
