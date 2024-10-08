import './VacationsPage.css';
import { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import { useAppDispatch } from '../../../Redux/Store';
import { AppState } from '../../../Redux/AppState';
import { vacationService } from '../../../Services/VacationService';
import FiltersContainer from '../../FiltersArea/FiltersContainer/FiltersContainer';
import VacationList from '../VacationList/VacationList';
import PaginationBar from '../../LayoutArea/PaginationBar/PaginationBar';
import { notify } from '../../../Utils/Notify';

function VacationsPage(): JSX.Element {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1); // State to track the current page number
    const vacationsPerPage = 12; // vacations per page, changed from 10, to 12, for a more symmetrical display.

    // Gets the visible vacations slice from redux store.
    const visibleVacations = useSelector((state: AppState) => state.vacations.visibleVacations);
    
    // Fetch vacations when the component mounts
    useEffect(() => {
        const fetchVacations = async () => {
            try {
                // On vacations page load -> fetch all vacations, either from backend, or from redux
                const vacationsData = await vacationService.getAllVacations();
            } 
            catch (err:any) {
                notify.error(err.message);
            }
        };
        fetchVacations();
    }, [dispatch]); // Dependency array includes dispatch to ensure effect runs only once

    // Calculate the total number of pages based on the number of visible vacations
    const pageCount = Math.ceil(visibleVacations.length / vacationsPerPage);
    
    // Handler to update the current page when a new page is selected in the pagination component
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div className="vacations-page-container fade-in-fast">
            <div className="filter-section">
                <FiltersContainer /> 
            </div>
            <div className="vacations-cards-section">
                <VacationList currentPage={currentPage} vacationsPerPage={vacationsPerPage} />
            </div>
            <div className="pagination-section">
                <PaginationBar count={pageCount} page={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default VacationsPage;
