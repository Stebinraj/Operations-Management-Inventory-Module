import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ItemsGroup from './pages/ItemsGroup';
import Items from './pages/Items';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/group/items' element={<ItemsGroup />}></Route>
            <Route path='/view/items' element={<Items />}></Route>
        </Routes>
    );
}

export default App;
