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
import SalesReturnsPage from './pages/SalesReturnsPage';
import ReturnedItemsPage from './pages/ReturnedItemsPage';
import CreditNotesPage from './pages/CreditNotesPage';
import VendorsPage from './pages/VendorsPage';
import PurchaseOrdersPage from './pages/PurchaseOrdersPage';
import ReceivedOrdersPage from './pages/ReceivedOrdersPage';
import BillsPage from './pages/BillsPage';
import BillPaymentsPage from './pages/BillPaymentsPage';
import VendorCreditPage from './pages/VendorCreditPage';

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
            <Route path='/returns/sales' element={<SalesReturnsPage />}></Route>
            <Route path='/returns/items' element={<ReturnedItemsPage />}></Route>
            <Route path='/returns/credit' element={<CreditNotesPage />}></Route>
            {/* Sales */}

            {/* Purchase */}
            <Route path='/vendors' element={<VendorsPage />}></Route>
            <Route path='/purchase/orders' element={<PurchaseOrdersPage />}></Route>
            <Route path='/purchase/received' element={<ReceivedOrdersPage />}></Route>
            <Route path='/purchase/bills' element={<BillsPage />}></Route>
            <Route path='/purchase/payments/bills' element={<BillPaymentsPage />}></Route>
            <Route path='/purchase/vendor/credit' element={<VendorCreditPage />}></Route>
            {/* Purchase */}
        </Routes>
    );
}

export default App;