/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import { Asset } from 'interfaces/Asset';
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
  const [filter, setFilter] = useState('lin');
  const [term, setTerm] = useState('');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  // Creates an Asset from the database search result
  const dataToAssetArray = (data: any[]) => {
    const mappedAssets: Asset[] = data.map((item: any) => {
      return {
        lin: item.LIN,
        po: item.PO,
        name: item.Name,
        serial: item.Serial,
        mac: item.MAC,
        ip: item.IP,
        category: item.Category,
        model: item.Model,
        user: item.User,
        department: item.Department,
        room: item.Room,
        status: item.Status,
      };
    });

    return mappedAssets;
  };

  // Populates columns array to display appropriate table columns depending on the filter
  const populateColumnsArray = async () => {
    switch (filter) {
      case 'lin':
      case 'serial':
      case 'user':
      case 'department':
      case 'room':
        await setColumns([
          'LIN',
          'Serial',
          'Category',
          'Model',
          'User',
          'Department',
          'Room',
          'Status',
        ]);
        break;
      case 'ip':
      case 'mac':
        await setColumns([
          'LIN',
          'MAC',
          'IP',
          'Category',
          'Model',
          'User',
          'Department',
          'Room',
          'Status',
        ]);
        break;
      case 'name':
        await setColumns([
          'Asset Name',
          'LIN',
          'Category',
          'Model',
          'User',
          'Department',
          'Room',
          'Status',
        ]);
        break;
      case 'po':
        await setColumns([
          'PO',
          'LIN',
          'Category',
          'Model',
          'User',
          'Department',
          'Room',
          'Status',
        ]);
        break;
      default:
        await setColumns([
          'LIN',
          'S',
          'Category',
          'Model',
          'User',
          'Department',
          'Room',
          'Status',
        ]);
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Get matching assets from the database and update assets and table columns
    search(filter, term)
      .then(async (result) => {
        setAssets([]);
        setColumns([]);
        populateColumnsArray();
        return setAssets(dataToAssetArray(result));
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  };

  return (
    <div className="block">
      <div id="search-bar">
        <form onSubmit={handleSubmit}>
          <MDBDropdown group>
            <MDBDropdownToggle
              className="btn btn-primary"
              tag="a"
              color="light"
              style={{ borderRadius: '5px 0 0 5px' }}
            >
              {filter}
            </MDBDropdownToggle>
            <MDBDropdownMenu style={{ borderRadius: '0px 0px 5px 5px' }}>
              <MDBDropdownItem
                onClick={(e) =>
                  setFilter(
                    (e.target as HTMLInputElement).innerText.toLowerCase()
                  )
                }
                link
              >
                Asset Name
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={(e) =>
                  setFilter(
                    (e.target as HTMLInputElement).innerText.toLowerCase()
                  )
                }
                link
              >
                Department
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={(e) =>
                  setFilter(
                    (e.target as HTMLInputElement).innerText.toLowerCase()
                  )
                }
                link
              >
                IP
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={(e) =>
                  setFilter(
                    (e.target as HTMLInputElement).innerText.toLowerCase()
                  )
                }
                link
              >
                LIN
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={(e) =>
                  setFilter(
                    (e.target as HTMLInputElement).innerText.toLowerCase()
                  )
                }
                link
              >
                MAC
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={(e) =>
                  setFilter(
                    (e.target as HTMLInputElement).innerText.toLowerCase()
                  )
                }
                link
              >
                Model
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={(e) =>
                  setFilter(
                    (e.target as HTMLInputElement).innerText.toLowerCase()
                  )
                }
                link
              >
                PO
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={(e) =>
                  setFilter(
                    (e.target as HTMLInputElement).innerText.toLowerCase()
                  )
                }
                link
              >
                Room
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={(e) =>
                  setFilter(
                    (e.target as HTMLInputElement).innerText.toLowerCase()
                  )
                }
                link
              >
                Serial
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={(e) =>
                  setFilter(
                    (e.target as HTMLInputElement).innerText.toLowerCase()
                  )
                }
                link
              >
                User
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
          <MDBInputGroup>
            <MDBInput
              onChange={(e) => setTerm(e.target.value)}
              label="Search"
            />
            <MDBBtn type="submit" rippleColor="dark">
              <MDBIcon icon="search" />
            </MDBBtn>
          </MDBInputGroup>
        </form>
      </div>

      <table className="table">
        <thead>
          <tr>
            {columns.map((column, i) => {
              return <th key={i}>{column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => {
            const assetFields = columns.map((column, i) => {
              return <td key={i}>{asset[column.toLowerCase()]}</td>;
            });
            return <tr key={asset.lin}>{assetFields}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
