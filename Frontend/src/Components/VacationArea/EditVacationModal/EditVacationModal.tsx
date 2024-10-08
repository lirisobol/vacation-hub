import { useSelector } from "react-redux";
import EditVacation from "../EditVacation/EditVacation";
import "./EditVacationModal.css";
import Modal from "react-bootstrap/Modal";
import { AppState } from "../../../Redux/AppState"; // Import AppState
import { useAppDispatch } from "../../../Redux/Store";
import { formActionCreators } from "../../../Redux/Slices/FormModalSlice";


function EditVacationModal(): JSX.Element {
    const dispatch = useAppDispatch();
    // Modal Global State
    const { showModal, mode, vacationId } = useSelector((state: AppState) => state.formModal);

    const handleModalClose = () => {
        dispatch(formActionCreators.closeEditModal());
    };

    return (
        showModal && mode === 'edit' ? (
            <Modal show={showModal} onHide={handleModalClose} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Vacation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {vacationId && (
                        <EditVacation vacationId={vacationId} onSuccessfulEdit={handleModalClose} />
                    )}
                </Modal.Body>
            </Modal>
        ) : null
    );
}


export default EditVacationModal;
