import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IUsersTable } from "../../types/types";

const UsersTable = ({ users, handleShow }: IUsersTable) => {
  return (
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
        {users.entities.map(({ id, name, username, email, address }, i) => (
          <tr key={i}>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{address?.city}</td>
            <td>
              <Link to={`/edit-user/${id}`}>
                <Button variant="warning">Edit</Button>
              </Link>
            </td>
            <td>
              <Button
                onClick={() => handleShow(id.toString())}
                variant="danger"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
