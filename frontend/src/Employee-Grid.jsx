import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import "./Employee-Grid.css";

const EmployeeGrid = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    position: "",
    salary: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get("http://localhost:3001/api/employees");
    setEmployees(response.data);
  };

  const handleAddClick = () => {
    setIsEdit(false);
    setEmployeeData({ name: "", position: "", salary: "" });
    setOpen(true);
  };

  const handleEditClick = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setEmployeeData({
      name: employee.name,
      position: employee.position,
      salary: employee.salary,
    });
    setEditId(id);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDeleteClick = async (id) => {
    await axios.delete(`http://localhost:3001/api/employees/${id}`);
    fetchEmployees();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (isEdit) {
      await axios.put(
        `http://localhost:3001/api/employees/${editId}`,
        employeeData
      );
    } else {
      await axios.post("http://localhost:3001/api/employees", employeeData);
    }
    setOpen(false);
    fetchEmployees();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "position", headerName: "Position", width: 150 },
    { field: "salary", headerName: "Salary", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            type="primary"
            variant="contained"
            startIcon={<Edit />}
            onClick={() => handleEditClick(params.row.id)}>
            Edit
          </Button>
        </>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            startIcon={<Delete />}
            onClick={() => handleDeleteClick(params.row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <h2 className="title">Employee Management System</h2>
      <div className="container">
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={employees}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
        <div className="add_employee">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddClick}
            startIcon={<Add />}>
            Add Employee
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEdit ? "Edit Employee" : "Add Employee"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={employeeData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="position"
              label="Position"
              type="text"
              fullWidth
              value={employeeData.position}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="salary"
              label="Salary"
              type="number"
              fullWidth
              value={employeeData.salary}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default EmployeeGrid;
