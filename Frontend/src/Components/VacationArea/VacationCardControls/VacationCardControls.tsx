import "./VacationCardControls.css";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { AppState } from '../../../Redux/AppState';
import { useAppDispatch } from '../../../Redux/Store';
import { formActionCreators } from "../../../Redux/Slices/FormModalSlice";
import { likeVacation, unlikeVacation } from '../../../Redux/Actions/LikeActions';
import { vacationService } from '../../../Services/VacationService';
import { UserRole } from '../../../Models/UserRole';
import { IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Modal, Button } from 'react-bootstrap';
import { notify } from '../../../Utils/Notify';

// Define the props for the VacationCardControls component
interface VacationCardControlsProps {
    vacationId: string;
    isLiked: boolean;
    likesCount: number;
}

function VacationCardControls({vacationId, isLiked, likesCount}: VacationCardControlsProps): JSX.Element {
    const dispatch = useAppDispatch();
    // User Role State
    const userRole = useSelector((state: AppState) => state.user.role);
    // Check If user is admin
    const isAdmin = userRole === UserRole.Admin;
    const [showModal, setShowModal] = useState(false);

    const handleEditClick = () => {
        dispatch(formActionCreators.openEditModal(vacationId));
    };

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        
    };

    const handleConfirmDelete = async () => {
        try {
            await vacationService.deleteVacation(vacationId);
            handleClose();
        } 
        catch (err:any) {
            notify.error(err);
        }
    };

    const handleLike = async () => {
        try {
            if (isLiked) {
                await dispatch(unlikeVacation(vacationId));
            } 
            else {
                await dispatch(likeVacation(vacationId));
            }
        } 
        catch (err:any) {
            notify.error(err);
        }
    };

    return (
        <div className="VacationCardControls">
            {isAdmin ? (
                <>
                    <IconButton className='admin-button delete-button' aria-label="delete" size="large" onClick={handleDeleteClick} sx={{ color: 'black' }}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton className='admin-button edit-button' aria-label="edit" size="large" onClick={handleEditClick} sx={{ color: 'black' }}>
                        <EditIcon />
                    </IconButton>
                    <Modal show={showModal} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this vacation?</Modal.Body>
                        <Modal.Footer className='mx-auto'>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleConfirmDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <div className="like-section">
                    <Checkbox 
                        icon={<FavoriteBorder />} 
                        checkedIcon={<Favorite />} 
                        checked={isLiked} 
                        onChange={handleLike}
                        sx={{ color: 'black', '&.Mui-checked': { color: 'red' } }}
                    />
                    <span className='likes-count' style={{ color: 'black', fontSize: '18px', verticalAlign: 'middle' }}>{likesCount}</span>
                </div>
            )}
        </div>
    );
}

export default VacationCardControls;
