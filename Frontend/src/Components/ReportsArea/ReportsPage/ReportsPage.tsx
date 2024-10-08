import { useEffect } from 'react';
import { AppState } from '../../../Redux/AppState';
import { useAppDispatch } from '../../../Redux/Store';
import {useSelector } from 'react-redux';
import { vacationService } from '../../../Services/VacationService';
import { CSVLink } from 'react-csv';
import LikesBarChart from "../LikesBarChart/LikesBarChart";
import PriceChart from '../PriceChart/PriceChart';

function ReportsPage(): JSX.Element {
    const dispatch = useAppDispatch();
    const vacations = useSelector((state: AppState) => state.vacations.allVacations);

    useEffect(() => {
        if (vacations.length === 0) {
            vacationService.getAllVacations();
        }
    }, [dispatch, vacations.length]);

    // Create a new array for CSV data, excluding specific fields and adding a sequential ID
    const csvData = vacations.map((vacation, index) => ({
        id: index + 1, // Sequential ID starting from 1
        destination: vacation.destination,
        description: vacation.description,
        start_date: vacation.startDate,
        end_date: vacation.endDate,
        price: vacation.price,
        likes: vacation.likesCount
    }));

    const filename = "vacations-report.csv";

    return (
        <div className="ReportsPage fade-in-fast">
            <div className='fs-1'>Reports</div>
            <CSVLink
                data={csvData}
                filename={filename}
                className="btn btn-outline-dark rounded shadow-sm p-2 m-2">
                Export Vacations Collection To CSV
            </CSVLink>

            <div className="charts-section d-flex flex-column justify-content-start align-items-center shadow-sm gap-5 p-4">
                <div className='chart-container w-100 d-flex shadow'>
                    <LikesBarChart vacations={vacations}/>
                </div>

                <div className='chart-container w-100 d-flex shadow'>
                    <PriceChart vacations={vacations} />
                </div>
            </div>
        </div>
    );
}

export default ReportsPage;
