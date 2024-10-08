import "./PaginationBar.css";
import Pagination from '@mui/material/Pagination';

// interface for the component props
interface PaginationBarProps {
    count: number; // Total number of pages
    page: number; // Current page
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void; // handle page change,passed from the parent - <VacationsPage>
}

function PaginationBar({ count, page, onPageChange }: PaginationBarProps) {
    return (
        <div className="PaginationBar">
            <Pagination 
                size='medium'
                count={count} 
                page={page} 
                onChange={onPageChange}
            />
        </div>
    );
}

export default PaginationBar;
