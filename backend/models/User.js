const db = require('../config/db');

const User = {
  create: (user, callback) => {
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.execute(query, [user.email, user.password], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.execute(query, [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },
};

module.exports = User;
