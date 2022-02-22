import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./components/users/UserList";
import { Provider } from "react-redux";
import { store } from "./store";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import { fetchUsers } from "./components/users/usersSlice";

store.dispatch(fetchUsers());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<UserList />} />
        <Route path="/add-user" element={<AddUser />}></Route>
        <Route path="/edit-user/:id" element={<EditUser />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
