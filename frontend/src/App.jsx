import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import rollbarConfig from './utils/rollbar.js';

const App = () => {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;