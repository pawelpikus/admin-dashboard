import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "Harrison Ford",
    username: "Harry",
    email: "ford@hollywood.com",
    city: "San Francisco",
  },
  {
    id: "2",
    name: "Dave Patrick",
    username: "Dave",
    email: "dave@brooklyn.com",
    city: "New York",
  },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded(state, action) {
      state.push(action.payload);
    },
    userUpdated(state, action) {
      const { id, name, email } = action.payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
      }
    },
  },
});

export const { userAdded } = userSlice.actions;
export const { userUpdated } = userSlice.actions;

export default userSlice.reducer;
