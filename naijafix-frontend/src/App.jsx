import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MobileSidebar from './components/Layout/MobileSidebar';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import CreateReport from './pages/CreateReport';
import Statistics from './pages/Statistics';
import Background from './components/UI/Background';
import './i18n';

function App() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const { t } = useTranslation();

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    return (
        <Router>
            <div className="min-h-screen">
                {/* Background removed from here - it will be added to specific pages only */}

                {/* Sidebars */}
                <Sidebar />
                <MobileSidebar
                    isOpen={mobileSidebarOpen}
                    onClose={() => setMobileSidebarOpen(false)}
                />

                {/* Header */}
                <Header onMenuToggle={toggleMobileSidebar} />

                {/* Main Content */}
                <main className="pt-16 lg:pl-64 transition-all duration-300">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/reports" element={<ReportsWithBackground />} />
                        <Route path="/create-report" element={<CreateReport />} />
                        <Route path="/statistics" element={<StatisticsWithBackground />} />
                    </Routes>
                </main>

                <footer className="bg-green-500 text-white py-4 mt-12 lg:ml-64 transition-all duration-300">
                    <div className="container mx-auto px-2 text-center">
                        <div className="flex justify-center items-center space-x-4 mb-4">
                            <h3 className="text-2xl font-bold text-white">NaijaFix</h3>
                        </div>
                        <p className="text-white text-sm opacity-120 mb-2">
                            Building Better Communities Across Nigeria
                        </p>
                        <p className="text-white text-sm opacity-100">
                            Covering all 36 States + Federal Capital Territory
                        </p>
                        <p className="text-white text-sm opacity-100">
                            © As'hamTech.
                        </p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

// Wrapper component for Reports with background
const ReportsWithBackground = () => {
    return (
        <div className="relative">
            <Background />
            <Reports />
        </div>
    );
};

// Wrapper component for Statistics with background
const StatisticsWithBackground = () => {
    return (
        <div className="relative">
            <Background />
            <Statistics />
        </div>
    );
};

export default App;