import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers: any = createAsyncThunk("fetchUsers", async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  );
  const users = await response.json();
  return users;
});

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
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
    },
    userUpdated(state, action) {
      const { id, name, email } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        return state.entities.filter((user) => user.id !== id);
      }
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userAdded, userUpdated, userDeleted } = userSlice.actions;

export default userSlice.reducer;
