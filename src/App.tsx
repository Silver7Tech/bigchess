import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '~/components/Header';
import { AuthProvider } from './providers/AuthProvider';
import ErrorBoundary from './providers/ErrorBoundary';

// import Room from './components/Room';
function App() {
  // const Home = lazy(() => import('./components/Home'));
  const Room = lazy(() => import('./components/Room'));
  const GameMode = lazy(() => import('./components/GameMode'));
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="h-screen w-screen overflow-hidden flex flex-col">
            <Header />
            <Suspense
              fallback={
                <div className="flex-1 flex items-center justify-center text-xl">Loading...</div>
              }
            >
              <Routes>
                <Route path="/" element={<Room />} />
                <Route path="/play" element={<Room />} />
                <Route path="/mode" element={<GameMode />} />
              </Routes>
            </Suspense>
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
