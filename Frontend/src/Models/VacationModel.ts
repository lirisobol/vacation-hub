export default class VacationModel {
    public _id?: string;
    public destination: string = '';
    public description: string = '';
    public startDate: string = '';  
    public endDate: string = '';    
    public price: number = 0;
    public imageName: string = '';
    public image?: File; 

    public isLiked: boolean;
    public likesCount: number = 0;

    public static destinationValidation = {
        required: { value: true, message: "Destination is required." }
    };

    public static descriptionValidation = {
        required: { value: true, message: "Description is required." }
    };

    public static dateValidation = {
        startDate: { required: { value: true, message: "Start date is required." } },
        endDate: { required: { value: true, message: "End date is required." } }
    };

    public static priceValidation = {
        required: { value: true, message: "Price is required." },
        min: { value: 0, message: "Price must be greater than $0." },
        max: { value: 10000, message: "Price must be less than $10,000." }
    };
}
