import "./AddVacationModal.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../Redux/Store";
import { AppState } from "../../../Redux/AppState"; 
import { formActionCreators } from "../../../Redux/Slices/FormModalSlice";
import AddVacation from "../AddVacation/AddVacation";
import Modal from "react-bootstrap/Modal";

function AddVacationModal(): JSX.Element {
    const dispatch = useAppDispatch();
    const { showModal, mode } = useSelector((state: AppState) => state.formModal);

    const handleModalClose = () => {
        dispatch(formActionCreators.closeAddModal());
    };

    return (
        showModal && mode === 'add' ? (
            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Vacation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <AddVacation onSuccessfulEdit={handleModalClose} />
                    </div>
                </Modal.Body>
            </Modal>
        ) : null
    );
}


export default AddVacationModal;