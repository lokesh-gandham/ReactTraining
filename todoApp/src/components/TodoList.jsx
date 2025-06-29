import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((item, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedText(tasks[index]);
  };

  const handleSave = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedText;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditedText("");
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          border: "2px solid black",
          padding: "32px",
          textAlign: "center",
          overflowX: "auto",
        }}
      >
        <Typography variant="h3" sx={{ color: "orangered", mb: 2 }}>
          TodoApp
        </Typography>

        <TextField
          sx={{ width: "75%", mb: 3 }}
          label="Add a task"
          variant="outlined"
          value={input}
          onChange={handleChange}
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="secondary" onClick={handleAdd}>
                  Add<AddCircleIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="h5" sx={{ mb: 2 }}>
          Todo List:
        </Typography>

        <Box sx={{ maxHeight: "50vh", overflowY: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>SN0:</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Task</TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    position: "sticky",
                    right: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                    textAlign: "right",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        size="small"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                    ) : (
                      item
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      position: "sticky",
                      right: 0,
                      backgroundColor: "#fff",
                      textAlign: "right",
                    }}
                  >
                    {editIndex === index ? (
                      <IconButton
                        color="success"
                        onClick={() => handleSave(index)}
                      >
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </div>
  );
}

export default TodoList;
