import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
function App() {
  const Room = lazy(() => import('./components/Room'));
  const Profile = lazy(() => import('./components/Detail/Profile'));
  const GameMode = lazy(() => import('./components/GameMode'));
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='my-auto'>
          <Routes>
              <Route path="/" element={<Room isPlaying = {false}/>} />
              <Route path="/play" element={<Room isPlaying = {true} />} />
              <Route path="/mode" element={<GameMode/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  )
}

export default App
