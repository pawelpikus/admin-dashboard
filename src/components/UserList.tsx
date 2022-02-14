import { Button, Container, Stack, Row, Table } from "react-bootstrap";

const UserList = () => {
  return (
    <Container className="my-4">
      <Row>
        <h1 className="py-3 px-0">Dashboard</h1>
      </Row>
      <Row>
        <Stack direction="horizontal" gap={3} className="mb-4 bg-light p-3">
          <h4>User List</h4>
          <Button variant="primary" className="ms-auto">
            Add user
          </Button>
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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>NYC</td>
              <td>
                <Button variant="warning">Edit</Button>
              </td>
              <td>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Oklahoma</td>
              <td>
                <Button variant="warning">Edit</Button>
              </td>
              <td>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default UserList;
