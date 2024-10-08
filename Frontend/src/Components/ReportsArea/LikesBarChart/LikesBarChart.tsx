import VacationModel from '../../../Models/VacationModel';
import { BarChart } from '@mui/x-charts/BarChart';

interface LikesBarChartProps {
    vacations: VacationModel[];
}
function LikesBarChart({ vacations }: LikesBarChartProps): JSX.Element {
    const destinations = vacations.map(vacation => vacation.destination);
    const likes = vacations.map(vacation => vacation.likesCount);
    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: destinations,  label:"Destination"}]}
            series={[{ data: likes , label:"Number Of Likes"}]}
            width={1000}
            height={400}
        />

    );
}
export default LikesBarChart;
