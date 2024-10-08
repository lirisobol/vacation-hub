import { BarChart} from "@mui/x-charts";
import VacationModel from "../../../Models/VacationModel";
import "./PriceChart.css";
interface PriceChartProps {
    vacations: VacationModel[];
}

function PriceChart({ vacations }: PriceChartProps): JSX.Element {
    const priceByDestination = new Map();
    // Aggregate prices by destination and count them
    vacations.forEach(vacation => {
        if (priceByDestination.has(vacation.destination)) {
            const { sum, count } = priceByDestination.get(vacation.destination);
            priceByDestination.set(vacation.destination, { sum: sum + vacation.price, count: count + 1 });
        } 
        else {
            priceByDestination.set(vacation.destination, { sum: vacation.price, count: 1 });
        }
    });
    // Calculate average prices
    const chartData = Array.from(priceByDestination, ([destination, { sum, count }]) => ({
        destination,
        averagePrice: sum / count
    }));
    return (
        <BarChart
            dataset={chartData}
            xAxis={[{ dataKey: 'destination', scaleType: 'band', label: "Destination" }]}
            series={[{ dataKey: 'averagePrice', type: 'bar', label: "Average Vacation Price", color:"#d500f9"}]}
            width={1000}
            height={400}
            
        />
    );
}
export default PriceChart;