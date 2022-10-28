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

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('connected');
    const result = await connection.execute(
      `SELECT *
      FROM INVDBMGR.ASSETS
      WHERE ASSET_ID = :id`,
      ['67164']
    );
    console.log(result.rows);
  } catch (err) {
    console.error(err);
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

run();
