import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from '../components/common/PublicLayout.jsx';
import Loader from '../components/common/Loader.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Services from '../pages/Services.jsx';
import ServiceDetail from '../pages/ServiceDetail.jsx';
import Projects from '../pages/Projects.jsx';
import ProjectDetail from '../pages/ProjectDetail.jsx';
import Contact from '../pages/Contact.jsx';
import NotFound from '../pages/NotFound.jsx';

// The admin area is lazy-loaded so regular visitors never download its code.
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin.jsx'));
const AdminLayout = lazy(() => import('../components/admin/AdminLayout.jsx'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard.jsx'));
const ManageServices = lazy(() => import('../pages/admin/ManageServices.jsx'));
const ManageProjects = lazy(() => import('../pages/admin/ManageProjects.jsx'));
const ManageTestimonials = lazy(() => import('../pages/admin/ManageTestimonials.jsx'));
const ManageTeam = lazy(() => import('../pages/admin/ManageTeam.jsx'));
const Inquiries = lazy(() => import('../pages/admin/Inquiries.jsx'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader fullPage />}>
      <Routes>
        {/* Public website: shares Navbar + Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin area */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="team" element={<ManageTeam />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
