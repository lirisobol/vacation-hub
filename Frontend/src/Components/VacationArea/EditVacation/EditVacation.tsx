import './EditVacation.css'; 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { appConfig } from "../../../Utils/AppConfig";
import VacationModel from "../../../Models/VacationModel";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { toSimpleDate } from '../../../Utils/dateUtils';
import { useSelector } from 'react-redux';
import { AppState } from '../../../Redux/AppState';
interface EditVacationProps {
    vacationId: string;
    onSuccessfulEdit: () => void;
}

function EditVacation({ vacationId, onSuccessfulEdit }: EditVacationProps): JSX.Element {
    // Form state to handle submission, initial set of edited vacation, and manual error setting for date pickers.
    const { register, handleSubmit, setValue, setError, clearErrors,formState: { errors } } = useForm<VacationModel>({
        mode: "onTouched"
    });

    // Set Image preview state.
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Fetch vacation from Redux store
    const vacation = useSelector((state: AppState) => state.vacations.allVacations.find(v => v._id === vacationId));

    // Prefill form using useEffect
    useEffect(() => {
        if (vacation) {
            setValue("destination", vacation.destination);
            setValue("description", vacation.description);
            setValue("startDate", toSimpleDate(vacation.startDate));
            setValue("endDate", toSimpleDate(vacation.endDate));
            setValue("price", vacation.price);
            setImagePreview(vacation.imageName ? `${appConfig.baseImageUrl}${vacation.imageName}` : "");
        }
    }, [vacation, setValue]);

    // Handle image file selection and set image preview.
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Retrieve the first file from the file input field, if available.
        const file = event.target.files && event.target.files[0];

        // Create a new FileReader object which allows web applications to asynchronously
        // read the contents of files
        const fileReader = new FileReader();

        // Set up an onload event listener.
        // This event is triggered each time the reading operation is successfully completed.
        fileReader.onload = (e) => {
            // Set the imagePreview state to the result of the file read operation.
            setImagePreview(e.target.result as string);
        };
        // Start reading the file's content.
        // Once finished, the result attribute contains a URL representing the file's data.
        fileReader.readAsDataURL(file);
    };

    // Form Submission after validation.
    async function send(vacation: VacationModel) {
        // Assign image file from input
        vacation.image = (vacation.image as unknown as FileList)[0];
        const updatedVacation = {
            ...vacation,
            startDate: new Date(vacation.startDate + 'T00:00:00Z').toISOString(), // Convert back to ISO string for backend
            endDate: new Date(vacation.endDate + 'T00:00:00Z').toISOString(),     // Convert back to ISO string for backend
        };
        // Date range validation
        if(updatedVacation.startDate >= updatedVacation.endDate) {
            setError("endDate", {
                type:"manual",
                message: "End date must be later then start date."
            });
        }
        else {
            clearErrors("endDate");
            try {
                await vacationService.updateVacation(vacationId, updatedVacation);
                notify.success("Vacations Has Been Updated Successfully");
                onSuccessfulEdit(); // callback to parent modal.
            }
            catch (err:any) {notify.error(err)}
        }
    }

    return (
        <div className="EditVacation">
            <form onSubmit={handleSubmit(send)} className="d-flex flex-column align-items-center w-100 h-100 bg-light">
                
                <input type="text" className="form-control p-2 mb-2" placeholder="Destination" {...register("destination", VacationModel.destinationValidation)}/>
                {errors.destination && <div className="alert alert-danger">{errors.destination.message}</div>}

                <textarea className="form-control p-2 mb-2" placeholder="Description" {...register("description", VacationModel.descriptionValidation)}/>
                {errors.description && <div className="alert alert-danger">{errors.description.message}</div>}

                <div className="d-flex flex-row justify-content-evenly w-100 mb-3">
                    <div className="date-wrapper w-50">
                        <FlightTakeoffIcon />
                        <label className="m-2">Start</label>
                        <input type="date" className="form-control p-3" {...register("startDate", VacationModel.dateValidation.startDate)}/>
                        {errors.startDate && <div className="alert alert-danger date-alert">{errors.startDate.message}</div>}
                    </div>
                    
                    <div className="date-wrapper w-50">
                        <FlightLandIcon />
                        <label className="m-2">End</label>
                        <input type="date" className="form-control p-3" {...register("endDate", VacationModel.dateValidation.endDate)}/>
                        {errors.endDate && <div className="alert alert-danger date-alert">{errors.endDate.message}</div>}
                    </div>
                </div>

                <input type="number" placeholder="Price" className="form-control p-3 mb-2" {...register("price", VacationModel.priceValidation)}/>
                {errors.price && <div className="alert alert-danger">{errors.price.message}</div>}

                <div className="image-selection-container w-100">
                    {imagePreview && <img src={imagePreview} alt="Preview" className="img-fluid"/>}
                    <input type="file" {...register("image")} className="form-control p-3 mb-2" onChange={handleImageChange}/>
                </div>
                
                <button className="btn btn-dark w-50 p-2 m-1 rounded-pill">Save Changes</button>
            </form>
        </div>
    );

}

export default EditVacation;
