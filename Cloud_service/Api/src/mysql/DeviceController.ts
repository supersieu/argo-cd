import mysql, { Pool } from "mysql2";
import { Controller } from "./Controller";

let pool =  mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB',
  connectionLimit: 10,
});

export class DeviceController implements Controller
{
  // Function to select data from the devices table
  select() {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
    // SQL query
    let sql = 'SELECT * FROM devices';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
    });
    connection.release();
  })
  }

  // Function to delete data from the buildings table
  find(id: string) {
    // Check for invalid input
    if (!id) {
      console.error('Invalid input. id is a required field.');
      return;
    }
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
  
    // SQL query using prepared statement
    let sql = 'SELECT * FROM devices WHERE id = ?';
    let data = [id];
  
    connection.execute(sql, data, function(err, result) {
      if (err) throw err;
      console.log('devices deleted successfully');
    });
    connection.release();
  })
  }
  
// Function to insert data into the devices table
insert(json: string) {
  let parsedData = JSON.parse(json);
  console.log('id = ' + parsedData.id + ', apns_token = ' + parsedData.apns_token + ' are required fields.');
// Check for invalid input
if (!parsedData.id || !parsedData.apns_token) {
  console.error('Invalid input. id, and apns_token are required fields.');
  return;
}
pool.getConnection(function(err, connection) {
  if (err) { console.log(err); return; };// not connected!
  // Use the connection

// SQL query using prepared statement
let sql = 'INSERT INTO devices (id, apns_token) VALUES (?, ?)';
let data = [parsedData.id, parsedData.apns_token];

connection.execute(sql, data, function(err, result) {
  if (err) console.log(err);
  else console.log('Device added successfully');
});
connection.release();
})
}

// Function to update data in the devices table
update(json: string) {
  let parsedData = JSON.parse(json);
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
  // Check for invalid input
  if (!parsedData.id || !parsedData.apns_token) {
    console.error('Invalid input. id and apns_token are required fields.');
    return;
  }

  // SQL query using prepared statement
  let sql = 'UPDATE devices SET apns_token = ? WHERE id = ?';
  let data = [parsedData.apns_token, parsedData.id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Device updated successfully');
  });
    connection.release();
})
}
// Function to delete data from the devices table
remove(id: string) {
  // Check for invalid input
  if (!id) {
    console.error('Invalid input. id is a required field.');
    return;
  }
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // Use the connection


  // SQL query using prepared statement
  let sql = 'DELETE FROM devices WHERE id = ?';
  let data = [id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Device deleted successfully');
  });
  connection.release();
})
}

}


