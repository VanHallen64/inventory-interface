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

async function search(filter, item) {
  let connection;

  let field;

  // Used when searching for MAC or IP
  let columnsNet = '';
  let joinNetTable = '';

  switch (filter) {
    case 'lin':
      field = 'VWSEARCH2."LIN"';
      break;
    case 'name':
      field = 'VWSEARCH2."Asset Name"';
      break;
    case 'model':
      field = 'VWSEARCH2."Model"';
      break;
    case 'department':
      field = 'VWSEARCH2."Department"';
      break;
    case 'po':
      field = 'VWSEARCH2."PO"';
      break;
    case 'serial':
      field = 'VWSEARCH2."Serial"';
      break;
    case 'room':
      field = 'VWSEARCH2."Room"';
      break;
    case 'user':
      field = 'VWSEARCH2."User"';
      break;
    case 'ip':
      field = 'MACIPSEARCH."IP"';
      columnsNet = `, MACIPSEARCH."MAC", MACIPSEARCH."IP"`;
      joinNetTable = ` INNER JOIN INVDBMGR.MACIPSEARCH ON INVDBMGR.VWSEARCH2.LIN = INVDBMGR.MACIPSEARCH.LIN`;
      break;
    case 'mac':
      field = 'MACIPSEARCH."MAC"';
      columnsNet = `, MACIPSEARCH."MAC", MACIPSEARCH."IP"`;
      joinNetTable = ` INNER JOIN INVDBMGR.MACIPSEARCH ON INVDBMGR.VWSEARCH2.LIN = INVDBMGR.MACIPSEARCH.LIN`;
      break;
    default:
      field = 'VWSEARCH2."LIN"';
  }

  const columns = `
  VWSEARCH2."LIN",
  VWSEARCH2."Serial",
  VWSEARCH2."Category",
  VWSEARCH2."Model",
  VWSEARCH2."Room",
  VWSEARCH2."User",
  VWSEARCH2."Department",
  VWSEARCH2."Status",
  VWSEARCH2."Asset Name",
  VWSEARCH2."PO"
  ${columnsNet}`;

  const query = `SELECT ${columns}
  FROM INVDBMGR.VWSEARCH2 ${joinNetTable}
  WHERE (((${field}) Like '%${item}%'))`;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(query);
    return result.rows;
  } catch (err) {
    return console.error(err);
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
