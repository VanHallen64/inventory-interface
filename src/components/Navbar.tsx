import { useState } from 'react';
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

function menuToggle(e) {
  e.preventDefault();
  console.log(e.currentTarget.style);

  //   if (visible) {
  //     $text.slideUp('fast', function () {
  //       $text.addClass('hide').slideDown(0);
  //     });
  //   } else {
  //     $text.slideUp(0, function () {
  //       $text.removeClass('hide').slideDown('fast');
  //     });
  //   }
  //   visible = !visible;
  // });
}

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const activeStyle = {
    textDecoration: 'underline',
  };

  const activeClassName = 'underline';

  return (
    <div>
      <ul className="navbar">
        <li>
          <button
            type="button"
            id="menu-button"
            onClick={(e) => {
              setVisible(!visible);
              if (visible) {
                $('.menu-text').hide();
              } else {
                $('.menu-text').show();
              }
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </li>
        <li>
          <NavLink
            to="search"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span className="menu-text">&nbsp; Search</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="home"
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            <FontAwesomeIcon icon={faHouse} />
            &nbsp; <span className="menu-text">Home</span>
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
            &nbsp; <span className="menu-text">Import</span>
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
            &nbsp; <span className="menu-text">Components</span>
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
            &nbsp; <span className="menu-text">Asset</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
