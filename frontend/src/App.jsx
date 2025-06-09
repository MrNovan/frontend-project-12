import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import LoginPage from './pages/LoginPage.jsx';

const App = () => {
  return (
    <Provider>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;