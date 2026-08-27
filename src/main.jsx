import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, useLocation } from 'react-router-dom'
import NavBarComponent from './Components/NavBarComponent/NavBarComponent.jsx'
import Footer from './Components/Footer/Footer.jsx'

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/create-account";

  return (
    <>
      {!hideLayout && <NavBarComponent />}
      <App />
      {!hideLayout && <Footer />}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>,
)
