import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
};

export const crudPracticeSlice = createSlice({
  name: "CRUD Practice",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({ ...action.payload, id: nanoid() });
    },
    removeUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
    editUser: (state, action) => {
      const { id, firstName, lastName, email, phone, isActive } =
        action.payload;
      const editedUser = state.users.find((user) => user.id === id);
      if (editedUser) {
        editedUser.firstName = firstName;
        editedUser.lastName = lastName;
        editedUser.email = email;
        editedUser.phone = phone;
        editedUser.isActive = isActive;
      }
    },
    setUser: (state, action) => {
      state.user = action.payload?.[0];
    },
  },
});

export default crudPracticeSlice.reducer;
export const { addUser, removeUser, setUser, editUser } =
  crudPracticeSlice.actions;
