import { NavLink } from 'react-router';

const Nav = () => {
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
          <NavLink to='projects' className={addNavLinkClass} end>
            Projects
          </NavLink>
          <NavLink to='education' className={addNavLinkClass} end>
            Education
          </NavLink>
          <NavLink to='services' className={addNavLinkClass} end>
            Services
          </NavLink>
          <NavLink to='contact' className={addNavLinkClass} end>
            Contact Me
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const addNavLinkClass = ({ isActive }) =>
  /* Adds nav-link class and triggers the link-active class for active NavLink */
  `nav-link ${isActive ? 'link-active' : ''}`.trim();

export default Nav;
