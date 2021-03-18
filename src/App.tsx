import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Menu } from "./components/molecules/Menu";
import AuthProvider from "./context/AuthContext";
import { Routes } from "./Routes";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Menu isOpen={isOpen} toggle={handleToggle} />
                    <Routes />
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
