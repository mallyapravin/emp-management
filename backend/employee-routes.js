const express = require("express");
const router = express.Router();
const employeesController = require("./employees-con");

//Employee routes
router.get("/", employeesController.getEmployees);
router.post("/", employeesController.addEmployee);
router.put("/:id", employeesController.updateEmployee);
router.delete("/:id", employeesController.deleteEmployee);

module.exports = router;
