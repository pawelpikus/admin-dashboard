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
  reducers: {},
});

export default userSlice.reducer;
