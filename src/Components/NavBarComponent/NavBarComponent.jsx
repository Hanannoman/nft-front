import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonBh from "../ButtonBh/ButtonBh";
import "./NavBarComponent.css";
import { IoClose } from "react-icons/io5";
import Logo from "../../assets/Images/Logo.png";
import nav_button_icon from "../../assets/Images/nav/nav-button-icon.png";
import nav_menu from "../../assets/Images/nav/nav_menu.svg";
import { logoutUser } from '../../api/auth';

export default function NavBarComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const closeButtonRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (sidebarOpen && closeButtonRef.current) closeButtonRef.current.focus();
  }, [sidebarOpen]);

  async function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    await logoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    alert("Logged out successfully");
    navigate("/login");
  }

  const navLinks = (
    <ul role="navigation">
      <li className="af-nav-link"><Link to="/marketplace">Marketplace</Link></li>
      <li className="af-nav-link"><Link to="/help">Help</Link></li>
      <li className="af-nav-link"><Link to="/createNft">Create NFT</Link></li>
      <li className="af-nav-link"><Link to="/transactions"> Transactions</Link></li>
      <li className="af-nav-link"><Link to="/profile">Profile</Link></li>
    </ul>
  );

  return (
    <nav className="af-nav">
      <Link to="/">
        <img className="af-nav-img" src={Logo} alt="logo" />
      </Link>

      <div className="af-nav-body">
        {navLinks}
        <div className="af-nav-buttons">
          {isLoggedIn ? (
            <ButtonBh
              showIcon="true"
              buttonText="Log out"
              buttonClass="bh-button-one af-nav-button"
              buttonIcon={nav_button_icon}
              onClick={handleLogout}
            />
          ) : (
            <Link to="/login">
              <ButtonBh
                showIcon="false"
                buttonText="Login/Register"
                buttonClass="bh-button-two af-nav-button"
              />
            </Link>
          )}
        </div>
      </div>

      <img
        className="toggler"
        onClick={toggleSidebar}
        aria-label="Menu"
        aria-expanded={sidebarOpen}
        src={nav_menu}
        alt="Menu icon"
      />

      {sidebarOpen && (
        <div className="af-offcanvas-nav">
          <IoClose
            ref={closeButtonRef}
            onClick={toggleSidebar}
            className="side-nav-icon"
          />
          <Link to="/">
            <img className="af-nav-img" src={Logo} alt="logo" />
          </Link>
          <div className="af-offcanvas-nav-body">
            {navLinks}
            <div className="offcanvas-buttons">
              {isLoggedIn ? (
                <ButtonBh
                  showIcon="true"
                  buttonText="Log out"
                  buttonClass="bh-button-one af-nav-button"
                  buttonIcon={nav_button_icon}
                  onClick={handleLogout}
                />
              ) : (
                <Link to="/login">
                  <ButtonBh
                    showIcon="false"
                    buttonText="Login/Register"
                    buttonClass="bh-button-one af-nav-button"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}