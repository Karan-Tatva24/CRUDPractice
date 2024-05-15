import { Input } from "../TextField";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteIcon, editIcon } from "../../assets";
import UserFormModal from "../ModalForm";
import {
  removeUser,
  setUser,
} from "../../redux/practiceSlices/crudPracticeSlice";

const MyTable = () => {
  const [tableData, setTableData] = useState([]);
  const [columnFilter, setColumnFilter] = useState("firstName");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => setTableData(users), [users]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    const singleUser = users?.filter((user) => user?.id === id);
    dispatch(setUser(singleUser));
    handleOpen();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const filterData = useCallback(() => {
    let filteredData = users;

    if (searchTerm) {
      filteredData = filteredData.filter((user) =>
        user[columnFilter]?.toString().toLowerCase().includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filteredData = filteredData.filter(
        (user) => user?.isActive === statusFilter
      );
    }

    setTableData(filteredData);
  }, [users, searchTerm, statusFilter, columnFilter]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  return (
    <>
      <Container maxWidth="xl" sx={{ padding: "1rem" }}>
        <Paper sx={{ border: "1px solid #dddd", marginTop: "2rem" }}>
          <Typography variant="body1" color="blueviolet" pl={2} pt={2}>
            <b>Search</b>
          </Typography>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            p={2}
            flexWrap="wrap"
            spacing={{ xs: 1, md: 2 }}
          >
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                flexWrap="wrap"
                gap={2}
              >
                <Input
                  name="columnName"
                  select
                  value={columnFilter}
                  onChange={(e) => setColumnFilter(e.target.value)}
                >
                  <MenuItem value="firstName">FirstName</MenuItem>
                  <MenuItem value="lastName">LastName</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phone">Phone</MenuItem>
                </Input>
                <Input
                  className="search-text"
                  name="search"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={handleSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={2}
              >
                <Button
                  name="All"
                  color="secondary"
                  variant={statusFilter === "all" ? "contained" : "outlined"}
                  onClick={() => {
                    setStatusFilter("all");
                    handleStatusFilter("all");
                  }}
                  size="small"
                />
                <Button
                  name="Active"
                  color="success"
                  variant={statusFilter === "active" ? "contained" : "outlined"}
                  onClick={() => {
                    setStatusFilter("active");
                    handleStatusFilter("active");
                  }}
                  size="small"
                />
                <Button
                  name="Inactive"
                  color="error"
                  variant={
                    statusFilter === "inactive" ? "contained" : "outlined"
                  }
                  onClick={() => {
                    setStatusFilter("inactive");
                    handleStatusFilter("inactive");
                  }}
                  size="small"
                />
                <Button
                  name="Create New User"
                  color="info"
                  startIcon={<AddIcon />}
                  size="large"
                  onClick={handleOpen}
                />
              </Box>
            </Grid>
          </Grid>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "#f6f6f6" }}>
                    <b>FirstName</b>
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#f6f6f6" }}>
                    <b>LastName</b>
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#f6f6f6" }}>
                    <b>Email</b>
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#f6f6f6" }}>
                    <b>Phone</b>
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#f6f6f6" }}>
                    <b>Status</b>
                  </TableCell>
                  <TableCell style={{ backgroundColor: "#f6f6f6" }}>
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.map((user) => {
                  return (
                    <TableRow key={user?.id}>
                      <TableCell>{user?.firstName}</TableCell>
                      <TableCell>{user?.lastName}</TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>{user?.phone}</TableCell>
                      <TableCell>
                        {
                          <Button
                            name={
                              user?.isActive === "active"
                                ? "Active"
                                : "Inactive"
                            }
                            color={
                              user?.isActive === "active" ? "success" : "error"
                            }
                            size="small"
                          />
                        }
                      </TableCell>
                      <TableCell>
                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                          gap={2}
                        >
                          <img
                            src={editIcon}
                            alt="edit"
                            onClick={() => handleEdit(user?.id)}
                          />
                          <img
                            src={deleteIcon}
                            alt="delete"
                            onClick={() => dispatch(removeUser(user?.id))}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={tableData?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <UserFormModal open={open} handleClose={handleClose} />
    </>
  );
};

export default MyTable;
