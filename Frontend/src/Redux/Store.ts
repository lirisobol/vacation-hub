import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { authReducersContainer } from "./Slices/AuthSlice";
import { vacationReducersContainer } from "./Slices/VacationSlice";
import { useDispatch } from "react-redux";
import { filterReducersContainer } from "./Slices/FilterSlice";
import { formModalReducersContainer } from "./Slices/FormModalSlice";


// Creating the application store - redux manager object:
export const appStore = configureStore<AppState>({
    reducer: {
        user: authReducersContainer,
        vacations: vacationReducersContainer,
        formModal: formModalReducersContainer,
        filters: filterReducersContainer
    }
})

// Define AppDispatch type based on the store dispatch type
export type AppDispatch = typeof appStore.dispatch;

// Custom hook to use AppDispatch type with useDispatch
// useDispatch is a custom hook from react-redux, which includes TypeScript type checking which the default dispatch does not.
export const useAppDispatch = () => useDispatch<AppDispatch>();