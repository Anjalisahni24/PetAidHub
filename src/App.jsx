import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutUsPage from '@/pages/AboutUsPage';
import CommunityPage from '@/pages/CommunityPage';
import CareToolsPage from '@/pages/CareToolsPage';
import SymptomCheckerPage from '@/pages/SymptomCheckerPage';
import HealthTrackerPage from '@/pages/HealthTrackerPage';
import MedicationReminderPage from '@/pages/MedicationReminderPage';
import VaccinationSchedulerPage from '@/pages/VaccinationSchedulerPage';
import ConsultVetPage from '@/pages/ConsultVetPage';
import PetInsurancePage from '@/pages/PetInsurancePage';
import ContactUsPage from '@/pages/ContactUsPage';
import SignInPage from '@/pages/SignInPage';
import MyAccountPage from '@/pages/MyAccountPage';
import CaramelChatbot from '@/components/CaramelChatbot';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/care-tools" element={<CareToolsPage />} />
            <Route path="/care-tools/symptom-checker" element={<SymptomCheckerPage />} />
            <Route path="/care-tools/health-tracker" element={<HealthTrackerPage />} />
            <Route path="/care-tools/medication-reminder" element={<MedicationReminderPage />} />
            <Route path="/care-tools/vaccination-scheduler" element={<VaccinationSchedulerPage />} />
            <Route path="/consult-a-vet" element={<ConsultVetPage />} />
            <Route path="/pet-insurance" element={<PetInsurancePage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/my-account" element={<MyAccountPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <CaramelChatbot />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
