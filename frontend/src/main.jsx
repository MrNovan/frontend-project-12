import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './slices/index.js'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './utils/i18n.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
