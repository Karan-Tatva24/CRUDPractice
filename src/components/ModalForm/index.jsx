import { Box, IconButton, MenuItem, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Input } from "../TextField";
import { Button } from "../Button";
import "./modalForm.css";
import { userDataSchema } from "../../validation/userDataSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  editUser,
  setUser,
} from "../../redux/practiceSlices/crudPracticeSlice";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  isActive: "",
};

const UserFormModal = ({ open, handleClose }) => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues,
    validationSchema: userDataSchema,
    onSubmit: (values) => {
      if (!user?.id) dispatch(addUser(values));
      else dispatch(editUser({ ...values, id: user?.id }));

      dispatch(setUser({}));
      formik.resetForm();
      handleClose();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setInitialValues({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      isActive: user?.isActive || "",
    });
  }, [user]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-container">
        <Box className="modal-header">
          <Typography variant="h6">
            {user?.id ? "Edit User" : "Create New User"}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => {
              dispatch(setUser({}));
              formik.resetForm();
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} p={1.5}>
            <Input
              name="firstName"
              label="First Name"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <Input
              name="lastName"
              label="Last Name"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <Input
              name="email"
              label="Email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Input
              name="phone"
              label="Phone Number"
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <Input
              name="isActive"
              label="Status"
              select
              fullWidth
              value={formik.values.isActive}
              onChange={formik.handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Input>
            <Box
              display="flex"
              justifyContent="flex-end"
              gap={3}
              alignItems="center"
            >
              <Button name="Submit" type="submit" color="info" />
              <Button
                name="Cancel"
                variant="outlined"
                color="error"
                onClick={() => {
                  dispatch(setUser({}));
                  formik.resetForm();
                  handleClose();
                }}
              />
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserFormModal;

// Validation of provided Prop types.
UserFormModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
