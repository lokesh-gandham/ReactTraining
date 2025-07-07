import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../../css/Navba.css';
import { useCart } from "../context/CartContext";

function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
}

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const payload = parseJwt(token);
  const { cartItems } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <div style={styles.leftSection}>
          <h1 style={{ color: 'white', marginRight: '20px' }}>Avenue</h1>
          <ul style={styles.navList}>
            {isLoggedIn && (
              <>
                {payload?.role === 'admin' && (
                  <li style={styles.navItem}>
                    <Link to="/home" style={styles.navLink}>Home</Link>
                  </li>
                )}
                {payload?.role === 'user' && (
                  <li style={styles.navItem}>
                    <Link to="/userDashboard" style={styles.navLink}>Dashboard</Link>
                  </li>
                )}
                {payload?.role === 'admin' && (
                  <li style={styles.navItem}>
                    <Link to="/dashboard" style={styles.navLink}>Admin Dashboard</Link>
                  </li>
                )}
              </>
            )}
            {isLoggedIn && (
              <li style={styles.navItem}>
                <Link to="/orders" style={styles.navLink}>Orders</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li style={styles.navItem}>
                <Link to="/Register" style={styles.navLink}>Register</Link>
              </li>
            )}
          </ul>
        </div>
        <div style={styles.rightSection}>
          {isLoggedIn && payload?.role === 'user' && (
            <Link to="/cartitems" style={styles.navLink}>Cart({cartItems.length})</Link>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} style={{ ...styles.navLink, marginLeft: '10px' }}>Logout</button>
          ) : (
            <Link to="/" style={styles.navLink}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 20px',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: '15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};