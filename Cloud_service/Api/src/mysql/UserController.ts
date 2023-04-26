import mysql, { Pool } from "mysql2";
import { Controller } from "./Controller";

let pool =  mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB',
  connectionLimit: 10,
});

export class UserController implements Controller
{
// @ device_id field missing
  // Function to select data from the users table
  select() {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection

    // SQL query
    let sql = 'SELECT * FROM users';
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
    let sql = 'SELECT * FROM users WHERE id = ?';
    let data = [id];
  
    connection.execute(sql, data, function(err, result) {
      if (err) throw err;
      console.log('users deleted successfully');
    });
    connection.release();
  })
  }
  
  // Function to insert data into the users table
  insert(json: string) {
    let parsedData = JSON.parse(json);
    console.log('id = ' + parsedData.id + ', name = ' + parsedData.name + ', email = ' + parsedData.email+ ', password = ' + parsedData.password + ' are required fields.');
  // Check for invalid input
  if (!parsedData.id || !parsedData.name || !parsedData.email || !parsedData.password) {
    console.error('Invalid input. id, name, email and password are required fields.');
    return;
  }
  pool.getConnection(function(err, connection) {
    if (err) { console.log(err); return; };// not connected!
    // Use the connection

  // SQL query using prepared statement
  let sql = 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)';
  let data = [parsedData.id, parsedData.name, parsedData.email, parsedData.password];

  connection.execute(sql, data, function(err, result) {
    if (err) console.log(err);
    else console.log('User added successfully');
  });
  connection.release();
  })
  }
  
  // Function to update data in the users table
  update(json: string) {
    let parsedData = JSON.parse(json);
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
      // Check for invalid input
      if (!parsedData.id || !parsedData.name || !parsedData.email || !parsedData.password) {
        console.error('Invalid input. id, name, email and password are required fields.');
        return;
      }

      // SQL query using prepared statement
      let sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
      let data = [parsedData.name, parsedData.email, parsedData.password, parsedData.id];

      connection.execute(sql, data, function(err, result) {
        if (err) throw err;
        console.log('User updated successfully');
      });
      connection.release();
    })
  }
  // Function to delete data from the users table
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
      let sql = 'DELETE FROM users WHERE id = ?';
      let data = [id];

      connection.execute(sql, data, function(err, result) {
        if (err) throw err;
        console.log('User deleted successfully');
      });
      connection.release();
    })
  }
}