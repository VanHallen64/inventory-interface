import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import SidebarMenu from 'react-bootstrap-sidebar-menu';

import {
  faHouse,
  faMagnifyingGlass,
  faMicrochip,
  faRightToBracket,
  faTableList,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <SidebarMenu expand={false} defaultExpanded={false} bg="light">
      <SidebarMenu.Collapse getScrollValue="300px">
        <SidebarMenu.Header>
          <SidebarMenu.Toggle />
        </SidebarMenu.Header>
        <SidebarMenu.Body>
          <SidebarMenu.Nav>
            <NavLink
              to="search"
              className={({ isActive }) =>
                isActive
                  ? 'sidebar-menu-nav-link selected'
                  : 'sidebar-menu-nav-link unselected'
              }
            >
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Search</SidebarMenu.Nav.Title>
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'sidebar-menu-nav-link selected'
                  : 'sidebar-menu-nav-link unselected'
              }
            >
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faHouse} size="2xl" />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Home</SidebarMenu.Nav.Title>
            </NavLink>
            <NavLink
              to="import"
              className={({ isActive }) =>
                isActive
                  ? 'sidebar-menu-nav-link selected'
                  : 'sidebar-menu-nav-link unselected'
              }
            >
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faRightToBracket} size="2xl" />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Import</SidebarMenu.Nav.Title>
            </NavLink>
            <NavLink
              to="components"
              className={({ isActive }) =>
                isActive
                  ? 'sidebar-menu-nav-link selected'
                  : 'sidebar-menu-nav-link unselected'
              }
            >
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faMicrochip} size="2xl" />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Components</SidebarMenu.Nav.Title>
            </NavLink>
            <NavLink
              to="asset"
              className={({ isActive }) =>
                isActive
                  ? 'sidebar-menu-nav-link selected'
                  : 'sidebar-menu-nav-link unselected'
              }
            >
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faTableList} size="2xl" />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Asset</SidebarMenu.Nav.Title>
            </NavLink>
          </SidebarMenu.Nav>
        </SidebarMenu.Body>
        {/* <NavLink>
            <SidebarMenu.Nav.Icon>{/* Menu item icon </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              {/* Menu item title
            </SidebarMenu.Nav.Title>
          </NavLink> */}
      </SidebarMenu.Collapse>
    </SidebarMenu>
  );
};

export default Navbar;
