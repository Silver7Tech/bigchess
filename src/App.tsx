import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '~/components/Header';
import Lobby from './components/Lobby';
import ComingSoon, { NotFound } from './components/UI/ComingSoon.ui';
import { AuthProvider } from './providers/AuthProvider';
import ErrorBoundary from './providers/ErrorBoundary';
import { SocketProvider } from './providers/SocketProvider';
function App() {
  const Home = lazy(() => import('./components/Home'));
  const Room = lazy(() => import('./components/Room'));
  const Pools = lazy(() => import('./components/Pools'));
  const Leaderboard = lazy(() => import('./components/Leaderboard'));
  const ProfileDetails = lazy(() => import('./components/Detail/Profile'));
  const Profile = lazy(() => import('./components/Detail'));
  const Deposit = lazy(() => import('./components/Detail/Deposit'));
  const Preferences = lazy(() => import('./components/Detail/Preferences'));
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketProvider>
            <div className="h-screen w-screen overflow-hidden flex flex-col">
              <Header />
              <Suspense
                fallback={
                  <div className="flex-1 flex items-center justify-center text-xl">Loading...</div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="play">
                    <Route index element={<Lobby />} />
                    <Route path="offline" element={<ComingSoon />} />
                    <Route path=":gameId" element={<Room />} />
                  </Route>
                  <Route path="pools" element={<Pools />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="profile" element={<Profile />}>
                    <Route path="" element={<ProfileDetails />} />
                    <Route path="deposit" element={<Deposit />} />
                    <Route path="preferences" element={<Preferences />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </SocketProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
