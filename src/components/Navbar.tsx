import { MouseEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

import {
  faBars,
  faHouse,
  faMagnifyingGlass,
  faMicrochip,
  faRightToBracket,
  faTableList,
} from '@fortawesome/free-solid-svg-icons';

function addActiveClass(a: any, b: any) {
  console.log(a);
  // $(`.${className}`).addClass('menu-active');
  return undefined;
}

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const activeStyle = {
    color: 'black',
    backgroundColor: 'white',
  };

  const activeClassName = 'underline';

  return (
    <div>
      <ul className="navbar">
        <li>
          <button
            title="menu-button"
            type="button"
            id="menu-button"
            onClick={(e) => {
              setVisible(!visible);
              if (visible) {
                $('.menu-text').css('display', 'none');
              } else {
                $('.menu-text').css('display', 'inline');
              }
            }}
          >
            <FontAwesomeIcon icon={faBars} size="2xl" />
          </button>
        </li>
        <li>
          <NavLink
            to="search"
            className={({ isActive }) => (isActive ? 'selected' : 'unselected')}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
            <span className="menu-text">&nbsp; Search</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="home"
            className={({ isActive }) => (isActive ? 'selected' : 'unselected')}
          >
            <FontAwesomeIcon icon={faHouse} size="2xl" />
            &nbsp; <span className="menu-text">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="import"
            className={({ isActive }) => (isActive ? 'selected' : 'unselected')}
          >
            <FontAwesomeIcon icon={faRightToBracket} size="2xl" />
            &nbsp; <span className="menu-text">Import</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="components"
            className={({ isActive }) => (isActive ? 'selected' : 'unselected')}
          >
            <FontAwesomeIcon icon={faMicrochip} size="2xl" />
            &nbsp; <span className="menu-text">Components</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="asset"
            className={({ isActive }) => (isActive ? 'selected' : 'unselected')}
          >
            <FontAwesomeIcon icon={faTableList} size="2xl" />
            &nbsp; <span className="menu-text">Asset</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
