import UserModel from "../Models/UserModel";
import { FilterState } from "./Slices/FilterSlice";
import { FormModalState } from "./Slices/FormModalSlice";
import { VacationState } from "./Slices/VacationSlice";
export type AppState = {
    user: UserModel;
    vacations: VacationState;
    formModal: FormModalState;
    filters: FilterState;
};