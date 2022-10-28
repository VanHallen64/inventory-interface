import {
  MDBBtn,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import { useState } from 'react';

const Search = () => {
  const [filter, setFilter] = useState('LIN');
  return (
    <div className="block">
      <div id="search-bar">
        <h2>Search</h2>
        <MDBDropdown group>
          <MDBDropdownToggle
            color="light"
            style={{ borderRadius: '5px 0 0 5px' }}
          >
            {filter}
          </MDBDropdownToggle>
          <MDBDropdownMenu style={{ borderRadius: '0px 0px 5px 5px' }}>
            <MDBDropdownItem
              onClick={(e) => setFilter((e.target as HTMLElement).innerText)}
              link
            >
              LIN
            </MDBDropdownItem>
            <MDBDropdownItem
              onClick={(e) => setFilter((e.target as HTMLElement).innerText)}
              link
            >
              Serial
            </MDBDropdownItem>
            <MDBDropdownItem
              onClick={(e) => setFilter((e.target as HTMLElement).innerText)}
              link
            >
              MAC
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBInputGroup>
          <MDBInput label="Search" />
          <MDBBtn rippleColor="dark">
            <MDBIcon icon="search" />
          </MDBBtn>
        </MDBInputGroup>
      </div>
    </div>
  );
};

export default Search;
