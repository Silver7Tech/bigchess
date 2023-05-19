import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "~/components/Header";
import { AuthProvider } from "./providers/AuthProvider";
function App() {
  const Home = lazy(() => import("./components/Home"));
  const Room = lazy(() => import("./components/Room"));
  const Pools = lazy(() => import("./components/Pools"));
  const Leaderboard = lazy(() => import("./components/Leaderboard"));
  const Profile = lazy(() => import("./components/Detail/Profile"));
  const Deposit = lazy(() => import("./components/Detail/Deposit"));
  const Preferences = lazy(() => import("./components/Detail/Preferences"));
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="h-screen flex flex-col overflow-hidden">
          <Header />
          <Suspense fallback={<div className="flex justify-center items-center my-auto font-bold">Loading...</div>}>
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Room isPlaying={true} />} />
                <Route path="/pools" element={<Pools />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/profile/deposit" element={<Deposit/>} />
                <Route path="/profile/preferences" element={<Preferences/>} />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </>
          </Suspense>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
