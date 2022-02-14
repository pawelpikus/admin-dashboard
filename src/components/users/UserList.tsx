import { Button, Stack, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import Layout from "./Layout";

const UserList = () => {
  const users = useAppSelector((state) => state.users);
  return (
    <Layout>
      <Row>
        <Stack
          direction="horizontal"
          gap={3}
          className="d-flex justify-content-between ms-auto bg-light p-3"
        >
          <h4>User List</h4>
          <Link to="/add-user">
            <Button variant="primary" className="ms-auto">
              Add user
            </Button>
          </Link>
        </Stack>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, username, email, city }, i) => (
              <tr key={i}>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{city}</td>
                <td>
                  <Link to={`/edit-user/${id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Layout>
  );
};

export default UserList;
