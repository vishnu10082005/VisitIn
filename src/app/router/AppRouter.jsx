import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '../../components/layout/RootLayout.jsx';
import { ReceptionLayout } from '../../components/layout/ReceptionLayout.jsx';

import { WelcomePage } from '../../pages/WelcomePage.jsx';
import { CheckInPage } from '../../pages/CheckInPage.jsx';
import { CheckInReviewPage } from '../../pages/CheckInReviewPage.jsx';
import { CheckInSuccessPage } from '../../pages/CheckInSuccessPage.jsx';
import { VisitorPassPage } from '../../pages/VisitorPassPage.jsx';
import { ReceptionDashboard } from '../../pages/ReceptionDashboard.jsx';
import { VisitorDetailsPage } from '../../pages/VisitorDetailsPage.jsx';
import { InvitationsPage } from '../../pages/InvitationsPage.jsx';
import { InviteVisitorPage } from '../../pages/InviteVisitorPage.jsx';
import { EmptyState } from '../../components/ui/EmptyState.jsx';
import { Compass } from 'lucide-react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: 'check-in',
        element: <CheckInPage />,
      },
      {
        path: 'check-in/review',
        element: <CheckInReviewPage />,
      },
      {
        path: 'check-in/success',
        element: <CheckInSuccessPage />,
      },
      {
        path: 'visitor-pass',
        element: <VisitorPassPage />,
      },
      {
        path: 'reception',
        element: <ReceptionLayout />,
        children: [
          {
            index: true,
            element: <ReceptionDashboard />,
          },
          {
            path: 'visitors',
            element: <VisitorDetailsPage />,
          },
          {
            path: 'invitations',
            element: <InvitationsPage />,
          },
        ],
      },
      {
        path: 'invite',
        element: <ReceptionLayout />,
        children: [
          {
            index: true,
            element: <InviteVisitorPage />,
          },
        ],
      },
      {
        path: '*',
        element: (
          <div className="flex-1 flex items-center justify-center p-6">
            <EmptyState
              icon={<Compass className="w-8 h-8 text-coral-500" />}
              title="Page Not Found"
              description="We couldn't locate this page. Let's get you back to the welcome reception desk."
              actionLabel="Go to Welcome Desk"
              onAction={() => window.location.assign('/')}
            />
          </div>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
