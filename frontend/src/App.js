import './App.css';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import ItemGroupPage from './pages/ItemGroupPage';
import ItemsPage from './pages/ItemsPage';
import InventoryAdjustmentsPage from './pages/InventoryAdjustmentsPage';
import SalesOrdersPage from './pages/SalesOrdersPage';
import PackagesPage from './pages/PackagesPage';
import DeliveryChallansPage from './pages/DeliveryChallansPage';
import ShipmentsPage from './pages/ShipmentsPage';
import DeliveredItemsPage from './pages/DeliveredItemsPage';
import InvoicesPage from './pages/InvoicesPage';
import PaymentsReceivedPage from './pages/PaymentsReceivedPage';

function App() {
    return (
        <Routes>
            <Route path='/' element={<DashboardPage />}></Route>
            {/* Inventory */}
            <Route path='/group/items' element={<ItemGroupPage />}></Route>
            <Route path='/view/items' element={<ItemsPage />}></Route>
            <Route path='/adjustments/inventory' element={<InventoryAdjustmentsPage />}></Route>
            {/* Inventory */}

            {/* Sales */}
            <Route path='/customers' element={<CustomersPage />}></Route>
            <Route path='/orders/sales' element={<SalesOrdersPage />}></Route>
            <Route path='/packages' element={<PackagesPage />}></Route>
            <Route path='/delivery/challans' element={<DeliveryChallansPage />}></Route>
            <Route path='/shipments' element={<ShipmentsPage />}></Route>
            <Route path='/delivered/items' element={<DeliveredItemsPage />}></Route>
            <Route path='/invoices' element={<InvoicesPage />}></Route>
            <Route path='/payments/received' element={<PaymentsReceivedPage />}></Route>
            {/* Sales */}
        </Routes>
    );
}

export default App;
