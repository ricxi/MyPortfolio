import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { addNavLinkClass } from '../helpers/navStyles';

const Nav = () => {
  const navigate = useNavigate();
  const { isSignedIn, signOutUser } = useAuth();

  const handleSignOut = () => {
    signOutUser();
    navigate('/');
  };

  return (
    <nav>
      <div className='container'>
        <div className='logo'>RX</div>
        <div className='nav-items'>
          <NavLink to='/' className={addNavLinkClass} end>
            Home
          </NavLink>
          <NavLink to='about' className={addNavLinkClass} end>
            About Me
          </NavLink>
          <NavLink to='services' className={addNavLinkClass} end>
            Services
          </NavLink>
          {isSignedIn && (
            <>
              <NavLink to='projects' className={addNavLinkClass} end>
                Projects
              </NavLink>
              <NavLink to='qualifications' className={addNavLinkClass} end>
                Qualifications
              </NavLink>
              <NavLink to='contact' className={addNavLinkClass} end>
                Contact Info
              </NavLink>
            </>
          )}

          {isSignedIn ? (
            <button className='nav-button' onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <>
              <NavLink to='/signup' className={addNavLinkClass} end>
                Sign Up
              </NavLink>
              <NavLink to='/signin' className={addNavLinkClass} end>
                Sign In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
