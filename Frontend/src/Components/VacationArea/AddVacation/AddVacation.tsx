import "./AddVacation.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import VacationModel from "../../../Models/VacationModel";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

interface AddVacationProps {
    onSuccessfulEdit: () => void;
}

function AddVacation({ onSuccessfulEdit }: AddVacationProps): JSX.Element {
    const navigate = useNavigate();

    // Form state to handle submission, initial set of edited vacation, and manual error setting for date pickers.
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<VacationModel>({
        mode: "onTouched" // entered and left.
    });
    // Set Image preview state.
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Retrieve the first file from the file input field, if available.
        const file = event.target.files && event.target.files[0];
        if (file) {
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
            clearErrors("image");
        } 
        else {
            setError("image", { type: "manual", message: "Image is required." });
        }
    };

    async function send(vacation: VacationModel) {
        // Initiate Dates objects for comparisons.
        const now = new Date();
        const startDate = new Date(vacation.startDate);
        const endDate = new Date(vacation.endDate);

        // Past dates validation
        if (startDate < now || endDate < now) {
            setError("startDate", { type: "manual", message: "No past dates are allowed." });
            setError("endDate", { type: "manual", message: "No past dates are allowed." });
            return;
        }

        // End > Start validation
        if (startDate >= endDate) {
            setError("endDate", { type: "manual", message: "End date must be later than start date." });
            return;
        }
        // Assign image file from input
        vacation.image = (vacation.image as unknown as FileList)[0];
        try {
            await vacationService.addVacation(vacation);
            notify.success("Vacation has been added.");
            navigate("/vacations"); // Adjust this URL as needed
            onSuccessfulEdit();
        } 
        catch (err: any) {notify.error(err)}
    };

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)} className="d-flex flex-column align-items-center w-100 h-100 bg-light">
                <input type="text" className="form-control p-2 mb-2" placeholder="Destination" {...register("destination", VacationModel.destinationValidation)}/>
                {errors.destination && <div className="alert alert-danger">{errors.destination.message}</div>}

                <textarea className="form-control p-2 mb-2" placeholder="Description" {...register("description", VacationModel.descriptionValidation)}/>
                {errors.description && <div className="alert alert-danger">{errors.description.message}</div>}

                <input type="number" placeholder="Price" className="form-control p-2 mb-2" {...register("price", VacationModel.priceValidation)}/>
                {errors.price && <div className="alert alert-danger">{errors.price.message}</div>}

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

                <div className="image-selection-container w-100">
                    {imagePreview && <img src={imagePreview} alt="Preview" className="img-fluid"/>}
                    <input type="file" {...register("image", { required: "Image is required." })} className="form-control p-3 mb-2" onChange={handleImageChange}/>
                    {errors.image && <div className="alert alert-danger">{errors.image.message}</div>}
                </div>

                <button className="btn btn-dark w-50 p-2 m-1 rounded-pill">Add Vacation</button>
            </form>
        </div>
    );
}

export default AddVacation;
