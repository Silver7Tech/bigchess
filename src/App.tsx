import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from '~/components/Header';
import { AuthProvider } from './providers/AuthProvider';
import ErrorBoundary from './providers/ErrorBoundary';
import { SocketProvider } from './providers/SocketProvider';
import Lobby from './components/Lobby';
function App() {
  const Room = lazy(() => import('./components/Room'));
  const GameMode = lazy(() => import('./components/GameMode'));
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
                  <Route index element={<Room />} />
                  <Route path="play" element={<Lobby />}>
                    <Route path="play/online/:roomId" element={<Room />} />
                    <Route path="play/offline" element={<div>Test</div>} />
                  </Route>
                  <Route path="/mode" element={<GameMode />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={<Profile />}>
                    <Route path="" element={<ProfileDetails />} />
                    <Route path="deposit" element={<Deposit />} />
                    <Route path="preferences" element={<Preferences />} />
                  </Route>
                  <Route path="/*" element={<Navigate to="/" />} />
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
