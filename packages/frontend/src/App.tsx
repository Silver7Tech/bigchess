import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
// import Room from './components/Room';
function App() {
  const Home = lazy(() => import('./components/Home'));
  const Room = lazy(() => import('./components/Room'));
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room" element={<Room/>} />
            {/* <Route path="/*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
