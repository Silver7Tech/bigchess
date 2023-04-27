import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
function App() {
  const Home = lazy(() => import('./components/Home'));
  const Room = lazy(() => import('./components/Room'));
  const GameMode = lazy(() => import('./components/GameMode'));
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='my-auto'>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/play" element={<Room/>} />
              <Route path="/mode" element={<GameMode/>} />
              {/* <Route path="/*" element={<Navigate to="/" />} /> */}
          </Routes>
        </div>
      </Suspense>
    </div>
  )
}

export default App
