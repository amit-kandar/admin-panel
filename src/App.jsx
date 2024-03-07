import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import Layout from './components/shared/Layout';
import Product from './components/Product';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    return (
        <div className={`${isDarkMode ? 'dark' : 'light'}`}>
            <Router>
                <Routes>
                    <Route path='/' element={<Layout setIsDarkMode={setIsDarkMode} />}>
                        <Route index={true} element={<Dashboard />} />
                        <Route path='products' element={<Product />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App