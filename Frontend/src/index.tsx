import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux';
import { appStore } from './Redux/Store';
import { interceptors } from './Utils/Interceptors';
import AddVacationModal from './Components/VacationArea/AddVacationModal/AddVacationModal';
import EditVacationModal from './Components/VacationArea/EditVacationModal/EditVacationModal';
import { Layout } from './Components/LayoutArea/Layout/Layout';

interceptors.listen();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={appStore}>
            <Layout />
            {/* Modals */}
            <AddVacationModal />
            <EditVacationModal />
        </Provider>
    </BrowserRouter>
);

reportWebVitals();
