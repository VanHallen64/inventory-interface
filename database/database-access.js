/* eslint-disable no-console */
const fs = require('fs');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig');
require('dotenv').config();

// On Windows and macOS, you can specify the directory containing the Oracle
// Client Libraries at runtime, or before Node.js starts.  On other platforms
// the system library search path must always be set before Node.js is started.
// See the node-oracledb installation documentation.
// If the search path is not correct, you will get a DPI-1047 error.
let libPath;
if (process.platform === 'win32') {
  // Windows
  libPath = process.env.WINDOWS_IC_PATH;
} else if (process.platform === 'darwin') {
  // macOS
  libPath = process.env.HOME + process.env.MACOS_IC_PATH;
}
if (libPath && fs.existsSync(libPath)) {
  try {
    oracledb.initOracleClient({
      configDir: process.env.TNS_ADMIN,
      libDir: libPath,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function search(type, item) {
  let connection;

  let field;

  let POCol = 'ASSETS.ASSET_PO,';
  let NameCol = 'ASSETS.ASSET_NAME,';
  let SerialNumberCol = 'ASSET_SERIAL_NUMBER,';
  let IPCol = 'IP_TABLE.IP,';
  let MACCol = 'IP_TABLE.IP_MAC_ADDRESS,';

  switch (type) {
    case 'lin':
      field = 'ASSETS.ASSET_ID';
      POCol = '';
      NameCol = '';
      MACCol = '';
      IPCol = '';
      break;
    case 'name':
      field = 'ASSETS.ASSET_NAME';
      SerialNumberCol = '';
      POCol = '';
      IPCol = '';
      MACCol = '';
      break;
    case 'model':
      field = 'ASSETS.ASSET_MODEL_2';
      POCol = '';
      NameCol = '';
      MACCol = '';
      IPCol = '';
      break;
    case 'department':
      field = 'DEPT.DEPARTMENT';
      POCol = '';
      NameCol = '';
      MACCol = '';
      IPCol = '';
      break;
    case 'po':
      field = 'ASSETS.ASSET_PO';
      SerialNumberCol = '';
      NameCol = '';
      IPCol = '';
      MACCol = '';
      break;
    case 'serial':
      field = 'ASSETS.ASSET_SERIAL_NUMBER';
      POCol = '';
      NameCol = '';
      MACCol = '';
      IPCol = '';
      break;
    case 'room':
      field = 'LOCATIONS.ASSET_ROOM';
      POCol = '';
      NameCol = '';
      MACCol = '';
      IPCol = '';
      break;
    case 'user':
      field = 'PEOPLE.NAME';
      POCol = '';
      NameCol = '';
      MACCol = '';
      IPCol = '';
      break;
    case 'ip':
      field = 'IP_TABLE.IP';
      SerialNumberCol = '';
      POCol = '';
      NameCol = '';
      break;
    case 'mac':
      field = 'IP_TABLE.IP_MAC_ADDRESS';
      SerialNumberCol = '';
      POCol = '';
      NameCol = '';
      break;
    default:
      field = 'ASSETS.ASSET_ID';
      POCol = '';
      NameCol = '';
      MACCol = '';
      IPCol = '';
  }

  const columns = `
	${POCol}
	${NameCol}
	ASSETS.ASSET_ID,
	${SerialNumberCol}
  ${MACCol}
  ${IPCol}
  ASSET_CATEGORIES.ASSET_CATEGORY_DESC,
  ASSETS.ASSET_MODEL_2,
  PEOPLE.NAME,
  DEPT.DEPARTMENT,
  LOCATIONS.ASSET_ROOM,
  ASSETS.ASSET_STATUS`;

  const query = `SELECT ${columns}
	FROM (((((INVDBMGR.ASSETS INNER JOIN INVDBMGR.LOCATIONS ON ASSETS.ASSET_ID = LOCATIONS.ASSET_ID) INNER JOIN INVDBMGR.PEOPLE ON LOCATIONS.ASSET_EMPLOYEE = PEOPLE.PIDM_CODE) INNER JOIN INVDBMGR.DEPT ON LOCATIONS.ASSET_DEPARTMENT_CODE = DEPT.DEPARTMENT_CODE) INNER JOIN INVDBMGR.ASSET_CATEGORIES ON ASSETS.ASSET_CATEGORY_CODE = ASSET_CATEGORIES.ASSET_CATEGORY_CODE) INNER JOIN INVDBMGR.COMPONENTS ON ASSETS.ASSET_ID = COMPONENTS.ASSET_ID) INNER JOIN INVDBMGR.IP_TABLE ON COMPONENTS.COMPONENT_MAC_ADDRESS = IP_TABLE.IP_MAC_ADDRESS
	WHERE (((${field}) Like '%${item}%'))`;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(query);
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = { search };
