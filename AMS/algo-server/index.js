const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'algoleap',
  password: 'Snal@2005'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// API routes
app.post('/algoleap', (req, res) => {
  const { login_username, login_password } = req.body;
  
  const q = 'SELECT * FROM login WHERE username = ?';

  connection.query(q, [login_username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    const user = results[0];
    if (!user) {
      return res.json({ success: false, usernameError: 'Username does not exist', passwordError: null });
    }

    if (user.password === login_password) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, usernameError: null, passwordError: 'Incorrect password' });
    }
  });
});

app.post('/algoleap/create_account', (req, res) => {
  const { signin_username, signin_password } = req.body;

  const checkQuery = 'SELECT * FROM login WHERE username = ?';

  connection.query(checkQuery, [signin_username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    if (results.length > 0) {
      return res.json({ success: false, checkUsername: 'Username already exists' });
    } else {
      const insertQuery = 'INSERT INTO login (username, password) VALUES (?, ?)';
      connection.query(insertQuery, [signin_username, signin_password], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Database error');
        }
        res.json({ success: true });
      });
    }
  });
});

app.get('/algoleap/:username', (req, res) => {
  const { username } = req.params;

  const q = 'SELECT * FROM Asset_Management WHERE reporting_manager = ? AND status = "active"';
  connection.query(q, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    console.log(results);
    res.json({ employees: results, activeCount: results.length });
  });
});

app.get('/algoleap/inactive/:username', (req, res) => {
  const { username } = req.params;

  const q = 'SELECT * FROM Asset_Management WHERE reporting_manager = ? and status = "inactive"';
  connection.query(q, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    console.log(results);
    res.json({ employees: results, activeCount: results.length });
  });
});

// app.post('/algoleap/make_active', (req, res) => {
//   const { employee_id } = req.body;

//   const updateQuery = 'UPDATE Asset_Management SET status = "Active" WHERE employee_id = ?';
//   connection.query(updateQuery, [employee_id], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Database error');
//     }
//     res.json({ success: true });
//   });
// });

app.get('/algoleap/:username/:employee_id', (req, res) => {
  const { username, employee_id } = req.params;

  const employeeQuery = 'SELECT * FROM Asset_Management WHERE employee_id = ?';
  connection.query(employeeQuery, [employee_id], (err, employeeResults) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    const employee = employeeResults[0];
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    const assetQuery = 'SELECT * FROM Asset WHERE emp_id = ?';
    connection.query(assetQuery, [employee_id], (err, assetResults) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database error');
      }

      let allot_date = assetResults.map(assetRes => {
        if (assetRes.allocated_date) {
          let localDate = new Date(assetRes.allocated_date.getTime() - (assetRes.allocated_date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
          return localDate;
        }
        return null;
      });

      res.json({ employee, assetResult: assetResults, username, allot_date });
    });
  });
});

// Serve React frontend
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
