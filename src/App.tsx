import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './components/molecules/Menu';
import AuthProvider from './context/AuthContext';
import { Routes } from './Routes';

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <BrowserRouter>
            <AuthProvider>
                <Menu isOpen={isOpen} toggle={handleToggle} />
                <Routes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
