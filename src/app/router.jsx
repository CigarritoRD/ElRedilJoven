import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { queryClient } from '../lib/queryClient';

const Home = lazy(() => import('../pages/public/Home').then((m) => ({ default: m.Home })));
const Program = lazy(() => import('../pages/public/Program').then((m) => ({ default: m.Program })));
const Activities = lazy(() => import('../pages/public/Activities').then((m) => ({ default: m.Activities })));
const ActivityDetail = lazy(() => import('../pages/public/ActivityDetail').then((m) => ({ default: m.ActivityDetail })));
const Gallery = lazy(() => import('../pages/public/Gallery').then((m) => ({ default: m.Gallery })));
const Announcements = lazy(() => import('../pages/public/Announcements').then((m) => ({ default: m.Announcements })));
const About = lazy(() => import('../pages/public/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('../pages/public/Contact').then((m) => ({ default: m.Contact })));
const Login = lazy(() => import('../pages/auth/Login').then((m) => ({ default: m.Login })));
const Dashboard = lazy(() => import('../pages/admin/Dashboard').then((m) => ({ default: m.Dashboard })));
const AdminActivities = lazy(() => import('../pages/admin/AdminActivities').then((m) => ({ default: m.AdminActivities })));
const AdminProgram = lazy(() => import('../pages/admin/AdminProgram').then((m) => ({ default: m.AdminProgram })));
const AdminGallery = lazy(() => import('../pages/admin/AdminGallery').then((m) => ({ default: m.AdminGallery })));
const AdminAnnouncements = lazy(() => import('../pages/admin/AdminAnnouncements').then((m) => ({ default: m.AdminAnnouncements })));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings').then((m) => ({ default: m.AdminSettings })));
const AdminPageContent = lazy(() => import('../pages/admin/AdminPageContent').then((m) => ({ default: m.AdminPageContent })));
const AdminLayout = lazy(() => import('../components/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

function RootLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/programa',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Program />
          </Suspense>
        ),
      },
      {
        path: '/actividades',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Activities />
          </Suspense>
        ),
      },
      {
        path: '/actividades/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ActivityDetail />
          </Suspense>
        ),
      },
      {
        path: '/galeria',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: '/anuncios',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Announcements />
          </Suspense>
        ),
      },
      {
        path: '/nosotros',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/contacto',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/admin',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AdminLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: 'actividades',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <AdminActivities />
              </Suspense>
            ),
          },
          {
            path: 'programa',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <AdminProgram />
              </Suspense>
            ),
          },
          {
            path: 'galeria',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <AdminGallery />
              </Suspense>
            ),
          },
          {
            path: 'anuncios',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <AdminAnnouncements />
              </Suspense>
            ),
          },
          {
            path: 'configuracion',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <AdminSettings />
              </Suspense>
            ),
          },
          {
            path: 'contenido',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <AdminPageContent />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
