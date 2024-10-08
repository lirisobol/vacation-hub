import './VacationCard.css'; 
import { appConfig } from '../../../Utils/AppConfig';
import VacationModel from '../../../Models/VacationModel';
import VacationCardControls from '../VacationCardControls/VacationCardControls';

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard({vacation}: VacationCardProps): JSX.Element {
    const imageUrl = appConfig.baseImageUrl + vacation.imageName;     
    return (
        <div className='vacation-card d-flex flex-column justify-content-start align-items-center'>
            <div className='card-image-container'>
                <img src={imageUrl} alt={`${vacation.destination}`} className="card-image" loading="lazy" />
            </div>
            <div className='card-details-container d-flex flex-column align-items-center border rounded shadow-sm w-100 h-50'>
                <h3 className='vacation-destination w-100 border rounded shadow-sm p-2'>{vacation.destination}</h3>
                <p className='vacation-description w-100 border rounded shadow-sm mb-3 p-2 fs-6'>{vacation.description}</p>
                <div className='vacation-dates w-100 mb-3 fs-5'>
                    <span className='border rounded shadow-sm m-2 p-2'>{new Date(vacation.startDate).toLocaleDateString()}</span>
                    <span className='border rounded shadow-sm m-2 p-2'>{new Date(vacation.endDate).toLocaleDateString()}</span>
                </div>
                <div className='vacation-price w-50 border rounded-pill shadow-sm mb-3 p-1 fs-5'>$ {vacation.price}</div>
            </div>
            <div className='card-controls-container'>
                <VacationCardControls
                    vacationId={vacation._id}
                    isLiked={vacation.isLiked}
                    likesCount={vacation.likesCount}
                />
            </div>
        </div>
    );
}

export default VacationCard;
