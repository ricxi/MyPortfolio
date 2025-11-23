/* Adds nav-link class and triggers the link-active class for active NavLink */
export const addNavLinkClass = ({ isActive }) =>
  `nav-link ${isActive ? 'link-active' : ''}`.trim();
