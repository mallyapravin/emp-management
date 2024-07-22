const db = require("./database-connection");

exports.getEmployees = (req, res, next) => {
  console.log("GET request recieved ...");
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

exports.addEmployee = (req, res, next) => {
  console.log("POST request recieved ...");
  const { name, position, salary } = req.body;
  db.query(
    "INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)",
    [name, position, salary],
    (err, results) => {
      if (err) return next(err);
      res.json({ id: results.insertId });
    }
  );
};

exports.updateEmployee = (req, res, next) => {
  console.log("UPDATE request recieved ...");
  const { name, position, salary } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?",
    [name, position, salary, id],
    (err, results) => {
      if (err) return next(err);
      res.json({ affectedRows: results.affectedRows });
    }
  );
};

exports.deleteEmployee = (req, res, next) => {
  console.log("DELETE request recieved ...");
  const { id } = req.params;
  db.query("DELETE FROM employees WHERE id = ?", [id], (err, results) => {
    if (err) return next(err);
    res.json({ affectedRows: results.affectedRows });
  });
};
