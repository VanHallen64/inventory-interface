import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import {
  faHouse,
  faMagnifyingGlass,
  faMicrochip,
  faRightToBracket,
  faTableList,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const activeStyle = {
    textDecoration: 'underline',
  };

  const activeClassName = 'underline';
  return (
    <div>
      <ul className="navbar">
        <li>
          <NavLink
            to="search"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            &nbsp; Search
          </NavLink>
        </li>
        <li>
          <NavLink
            to="home"
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            <FontAwesomeIcon icon={faHouse} />
            &nbsp; Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="import"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <FontAwesomeIcon icon={faRightToBracket} />
            &nbsp; Import
          </NavLink>
        </li>
        <li>
          <NavLink
            to="components"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <FontAwesomeIcon icon={faMicrochip} />
            &nbsp; Components
          </NavLink>
        </li>
        <li>
          <NavLink
            to="Asset"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <FontAwesomeIcon icon={faTableList} />
            &nbsp; Asset
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
