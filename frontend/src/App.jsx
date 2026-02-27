import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ClassesPage from '@/pages/ClassesPage';
import StitchingPage from '@/pages/StitchingPage';
import PantsCategoryPage from '@/pages/PantsCategoryPage';
import ChudiMeasurementPage from '@/pages/measurements/ChudiMeasurementPage';
import PantsMeasurementPage from '@/pages/measurements/PantsMeasurementPage';
import BlouseMeasurementPage from '@/pages/measurements/BlouseMeasurementPage';
import SkirtsMeasurementPage from '@/pages/measurements/SkirtsMeasurementPage';
import SareeMeasurementPage from '@/pages/measurements/SareeMeasurementPage';
import TraditionalTopSkirtMeasurementPage from '@/pages/measurements/TraditionalTopSkirtMeasurementPage';
import LehengaMeasurementPage from '@/pages/measurements/LehengaMeasurementPage';

import FrockMeasurementPage from '@/pages/measurements/FrockMeasurementPage';
import EnrollmentPage from '@/pages/EnrollmentPage';
import ClassDetailsPage from '@/pages/ClassDetailsPage';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/classes/:classId" element={<ClassDetailsPage />} />
            <Route path="/stitching" element={<StitchingPage />} />
            <Route path="/stitching/chudi" element={<ChudiMeasurementPage />} />
            <Route path="/stitching/pants" element={<PantsCategoryPage />} />
            <Route path="/stitching/pants/:pantType" element={<PantsMeasurementPage />} />
            <Route path="/stitching/blouse" element={<BlouseMeasurementPage />} />
            <Route path="/stitching/skirts" element={<SkirtsMeasurementPage />} />
            <Route path="/stitching/saree" element={<SareeMeasurementPage />} />
            <Route path="/stitching/traditional-top-skirt" element={<TraditionalTopSkirtMeasurementPage />} />
            <Route path="/stitching/lehenga" element={<LehengaMeasurementPage />} />
            <Route path="/stitching/frock" element={<FrockMeasurementPage />} />
            <Route path="/enroll" element={<EnrollmentPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;

