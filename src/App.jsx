import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

// components
import Navbar from './components/Navbar';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="app h-[100vh]">
      <Navbar />

      <main className="max-w-[1200px]" style={{margin: '0 auto'}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:city" element={<Main />} />
            <Route path="/:city/:county" element={<Main />} />
            <Route
              path="404"
              element={
                <div className="font-bold">
                  <h1>Sayfa bulunamadı 404</h1>
                  <Link className="text-blue underline" to="/">
                    Ana sayfaya git
                  </Link>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </main>
      <footer className="text-sm text-center font-bold">
        <div className="border my-5"></div>
        <div>© 2023 - nobetci-eczaneler.com</div>
      </footer>
    </div>
  );
}

export default App;
