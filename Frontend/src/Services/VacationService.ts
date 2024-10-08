import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import { vacationActionCreators } from "../Redux/Slices/VacationSlice";

class VacationService {
    public async getVacation(vacationId: string): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
        return response.data;
    }
    public async getAllVacations(): Promise<VacationModel[]> {
        const state = appStore.getState();
        if (state.vacations.allVacations.length > 0) {
            // If vacations are already loaded in the state, return them, reducing unnecessary backend calls.
            return state.vacations.allVacations;
        }    
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
        let vacations = response.data;
        // Redux Dispatch to set vacations
        appStore.dispatch(vacationActionCreators.setAllVacations(vacations));
        return vacations;
    }
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const formData = new FormData();
        // For each key in object -> set value to vacations[key], if undefined -> set as vacations[key].toString
        Object.keys(vacation).forEach(key => {
            const value = (vacation as any)[key];
            if (value !== undefined) {
                formData.append(key, value.toString());
            }
        });
        if (vacation.image) {
            formData.append('image', vacation.image);
        }
    
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, formData, appConfig.axiosOptions);
        const addedVacation = response.data;
        // Dispatch the action to add this new vacation to the Redux store
        appStore.dispatch(vacationActionCreators.addVacation(addedVacation));
        return addedVacation;
    }
    public async updateVacation(vacationId: string, vacation: VacationModel): Promise<VacationModel> {
        const formData = new FormData();
        // For each key in object -> set value to vacations[key], if undefined -> set as vacations[key].toString
        Object.keys(vacation).forEach(key => {
            const value = (vacation as any)[key];
            if (value !== undefined) {
                formData.append(key, value.toString());
            }
        });
        if (vacation.image) {
            formData.append('image', vacation.image);
        }    
        const response = await axios.put<VacationModel>(`${appConfig.vacationsUrl}${vacationId}`, formData, appConfig.axiosOptions);
        const updatedVacation = response.data;
        appStore.dispatch(vacationActionCreators.updateVacation(updatedVacation));
        return updatedVacation;
    }
    public async deleteVacation(vacationId: string): Promise<void> {
        await axios.delete(`${appConfig.vacationsUrl}${vacationId}`);
        appStore.dispatch(vacationActionCreators.deleteVacation(vacationId));
    }
}
export const vacationService = new VacationService();
