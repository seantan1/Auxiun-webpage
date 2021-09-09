import React from "react";
import "./css/AssignAdmin.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function createData(userid, username, email) {
  return { userid, username, email };
}

// const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];
const rows = [
  createData(1, "test1", "test@hotmail.co.uk"),
  createData(2, "test2", "test@hotmail.co.uk"),
  createData(3, "test3", "test@hotmail.co.uk"),
  createData(4, "test4", "test@hotmail.co.uk"),
  createData(5, "test5", "test@hotmail.co.uk"),
];

const AssignAdmin = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className={classes.root}>
      <div id="assign-admin">
        <div className="admin-banner">
          <h4>Assign A New Admin</h4>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-readonly-label">
                    USER ID
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-readonly-label"
                    id="demo-simple-select-readonly"
                    value={age}
                    onChange={handleChange}
                    inputProps={{ readOnly: true }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText>Read only</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Username
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <button>Submit</button>
          </div>
          <div className="admin-list">
            <h4 className="admin-title">Current Admin List</h4>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="text-center">User ID</TableCell>
                    <TableCell align="text-center">Username</TableCell>
                    <TableCell align="text-center">Email</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="text-center">{row.userid}</TableCell>
                      <TableCell align="text-center">{row.username}</TableCell>
                      <TableCell align="text-center">{row.email}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="admin-list">
            <h4 className="admin-title">Current User List</h4>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="text-center">UserID&nbsp;</TableCell>
                    <TableCell align="text-center">Username&nbsp;</TableCell>
                    <TableCell align="text-center">Email&nbsp;</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="text-center">{row.userid}</TableCell>
                      <TableCell align="text-center">{row.username}</TableCell>
                      <TableCell align="text-center">{row.email}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignAdmin;
