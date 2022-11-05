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
import { search } from '../../database/database-access';

const Search = () => {
  const [filter, setFilter] = useState('LIN');
  let result;
  // eslint-disable-next-line promise/catch-or-return
  search('ip', '10.2.39.173').then((asset) => console.log(asset));
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
      <table className="table">
        <thead>
          <tr>
            {/* {result[0].map(function (asset, i) {
              return <th scope="col"></th>;
            })} */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Search;
