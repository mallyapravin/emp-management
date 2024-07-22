const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database-connection");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Routes
const employeeRoutes = require("./employee-routes");
app.use("/api/employees", employeeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
