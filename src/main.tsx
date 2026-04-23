import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout, AppHome } from './App.tsx';
import { OurWorkPage } from './pages/OurWork.tsx';
import { ContactPage } from './pages/Contact.tsx';
import CafeExample from './CafeExample.tsx';
import { TechLayout, TechHome, TechAbout, TechContact } from './TechStartupExample.tsx';
import { PremiumLayout, PremiumHome, PremiumDashboard, PremiumContact } from './PremiumExample.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main Website */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<AppHome />} />
          <Route path="our-work" element={<OurWorkPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        
        {/* Starter Plan - Single Page */}
        <Route path="/cafe" element={<CafeExample />} />
        
        {/* Growth Plan - Multi Page */}
        <Route path="/tech" element={<TechLayout />}>
          <Route index element={<TechHome />} />
          <Route path="about" element={<TechAbout />} />
          <Route path="contact" element={<TechContact />} />
        </Route>
        
        {/* Premium Plan - Multi Page + Dashboard */}
        <Route path="/premium" element={<PremiumLayout />}>
          <Route index element={<PremiumHome />} />
          <Route path="contact" element={<PremiumContact />} />
        </Route>
        <Route path="/premium/dashboard" element={<PremiumDashboard />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
