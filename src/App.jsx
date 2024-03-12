import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import Layout from './components/shared/Layout';
import "chart.js/auto";
import Service from './routes/Service';
import ContactUs from './routes/ContactUs';
import Testimonials from './routes/Testimonials';
import WhyChooseUs from './routes/WhyChooseUs';
import Hero from './routes/Hero'
import AboutUs from './routes/AboutUs';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    return (
        <div className={`${isDarkMode ? 'dark' : 'light'}`}>
            <Router>
                <Routes>
                    <Route path='/' element={<Layout setIsDarkMode={setIsDarkMode} />}>
                        <Route index={true} element={<Dashboard />} />
                        <Route path='pages'>
                            <Route path='about-us' element={<AboutUs />} />
                            <Route path='services' element={<Service />} />
                            <Route path='contact-us' element={<ContactUs />} />
                            <Route path='testimonials' element={<Testimonials />} />
                            <Route path='why-choose-us' element={<WhyChooseUs />} />
                            <Route path='hero' element={<Hero />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>

        </div>
    )
}

export default App