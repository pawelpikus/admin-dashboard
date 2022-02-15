import { useState } from "react";
import { Button, Stack, Row, Table, Modal, Alert } from "react-bootstrap";
import { userDeleted } from "./usersSlice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Layout from "./Layout";
import axios from "axios";

type ModalState = {
  show: boolean;
  id: string | null;
};

const UserList = () => {
  const users = useAppSelector((state) => state.users);
  const loading = useAppSelector((state) => state.users.loading);
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<ModalState>({
    show: false,
    id: null,
  });

  const handleShow = (id: string) => {
    setModal({
      show: true,
      id,
    });
  };

  const handleClose = () =>
    setModal({
      ...modal,
      show: false,
      id: null,
    });

  const handleConfirmDelete = async () => {
    if (modal.show && modal.id) {
      try {
        await axios.delete(
          `https://jsonplaceholder.typicode.com/posts/${modal.id}`
        );
      } catch (e) {
        console.log(e);
      }

      dispatch(userDeleted({ id: Number(modal.id) }));
      setModal({
        ...modal,
        show: false,
        id: null,
      });
    }
  };

  const modalComponent = (
    <Modal show={modal.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete the user?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <Layout>
      {modal ? modalComponent : null}
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
        {loading ? (
          <Alert variant={"info"}>Loading users...</Alert>
        ) : (
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
              {users.entities.map(
                ({ id, name, username, email, address }, i) => (
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
                )
              )}
            </tbody>
          </Table>
        )}
      </Row>
    </Layout>
  );
};

export default UserList;
