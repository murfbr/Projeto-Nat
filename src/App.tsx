/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'

// Pages
import Index from './pages/Index'
import Login from './pages/auth/Login'
import NotFound from './pages/NotFound'

// Layouts
import AdminLayout from './components/layout/AdminLayout'
import EmployeeLayout from './components/layout/EmployeeLayout'

// Super Admin Pages
import SuperAdminDashboard from './pages/super-admin/Dashboard'
import Companies from './pages/super-admin/Companies'
import Content from './pages/super-admin/Content'
import Clinical from './pages/super-admin/Clinical'

// Company Admin Pages
import CompanyDashboard from './pages/company-admin/Analytics'
import Sectors from './pages/company-admin/Sectors'
import Employees from './pages/company-admin/Employees'

// Employee Pages
import EmployeeDashboard from './pages/employee/Dashboard'
import Questionnaire from './pages/employee/Questionnaire'
import Library from './pages/employee/Library'
import { LGPDModal } from './components/auth/LGPDModal'

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LGPDModal />
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />

          {/* Super Admin Routes */}
          <Route path="/super-admin" element={<AdminLayout />}>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="companies" element={<Companies />} />
            <Route path="content" element={<Content />} />
            <Route path="clinical" element={<Clinical />} />
          </Route>

          {/* Company Admin Routes */}
          <Route path="/company-admin" element={<AdminLayout />}>
            <Route index element={<CompanyDashboard />} />
            <Route path="sectors" element={<Sectors />} />
            <Route path="employees" element={<Employees />} />
          </Route>

          {/* Employee Routes */}
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="questionnaire" element={<Questionnaire />} />
            <Route path="library" element={<Library />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
