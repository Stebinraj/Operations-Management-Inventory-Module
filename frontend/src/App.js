import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ItemsGroup from './pages/ItemsGroup';
import Items from './pages/Items';
import InventoryAdjustments from './pages/InventoryAdjustments';
import Customers from './pages/Customers';
import SalesOrders from './pages/SalesOrders';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            {/* Inventory */}
            <Route path='/group/items' element={<ItemsGroup />}></Route>
            <Route path='/view/items' element={<Items />}></Route>
            <Route path='/adjustments/inventory' element={<InventoryAdjustments />}></Route>
            {/* Inventory */}
            {/* Sales */}
            <Route path='/customers' element={<Customers />}></Route>
            <Route path='/orders/sales' element={<SalesOrders />}></Route>
            {/* Sales */}
        </Routes>
    );
}

export default App;
