import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "~/components/Header";
import { AuthProvider } from "./providers/AuthProvider";
function App() {
  const Room = lazy(() => import("./components/Room"));
  const GameMode = lazy(() => import("./components/GameMode"));
  const Leaderboard = lazy(() => import("./components/Leaderboard"));
  const Profile = lazy(() => import("./components/Detail/Profile"));
  const Deposit = lazy(() => import("./components/Detail/Deposit"));
  const Preferences = lazy(() => import("./components/Detail/Preferences"));
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <div className="my-auto">
              <Routes>
                <Route path="/" element={<Room isPlaying={false} />} />
                <Route path="/play" element={<Room isPlaying={true} />} />
                <Route path="/mode" element={<GameMode />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/deposit" element={<Deposit/>} />
                <Route path="/preferences" element={<Preferences/>} />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </Suspense>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
