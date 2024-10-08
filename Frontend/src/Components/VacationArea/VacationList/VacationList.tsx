import './VacationList.css'; 
import { useSelector } from 'react-redux';
import { AppState } from '../../../Redux/AppState';
import VacationCard from '../VacationCard/VacationCard';

interface VacationListProps {
    currentPage: number;
    vacationsPerPage: number;
}

function VacationList({ currentPage, vacationsPerPage }: VacationListProps): JSX.Element {    
    // Get the visible vacations state
    const { visibleVacations } = useSelector((state: AppState) => state.vacations);

    // Calculate the size of the slice we need from the vacations state.
    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    
    // Slice vacations for the current page
    const currentVacations = visibleVacations.slice(indexOfFirstVacation, indexOfLastVacation);
    
    return (
        <div className="vacation-list d-flex justify-content-evenly flex-wrap">
            {currentVacations.map(vacation => (
                <VacationCard 
                    key={vacation._id}
                    vacation={vacation}
                />
            ))}
        </div>
    );
}

export default VacationList;
