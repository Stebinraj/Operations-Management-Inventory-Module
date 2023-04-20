import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ItemsGroup from './pages/ItemsGroup';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/itemsgroup' element={<ItemsGroup />}></Route>
        </Routes>
    );
}

export default App;
