import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Welcome Back</h1>
        {user && (
          <div className="navbar-user">
            <button onClick={handleLogout} className="navbar-logout">
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}; 