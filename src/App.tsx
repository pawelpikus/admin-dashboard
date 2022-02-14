import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/">
            <UserList />
          </Route>
          <Route path="/add-user">
            <h1>Add user</h1>
          </Route>
          <Route path="/edit-user">
            <h1>Edit user</h1>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
