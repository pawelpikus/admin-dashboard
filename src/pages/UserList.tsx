import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { userDeleted } from "../redux/usersSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Layout from "../components/Layout";
import axios from "axios";
import ModalPopup from "../components/ModalPopup";
import { ModalState } from "../types/types";
import TableContent from "../components/users/TableContent";
import AddUserBtn from "../components/users/AddUserBtn";
import UserListTitle from "../components/users/UserListTitle";

const UserList = () => {
  const users = useAppSelector((state) => state.users);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<ModalState>({
    show: false,
    id: null,
  });
  const [usersAmount, setUsersAmount] = useState(0);

  useEffect(() => {
    setUsersAmount(users.entities.length);
  }, [users.entities.length]);

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

  return (
    <Layout>
      {modal ? (
        <ModalPopup
          modal={modal}
          handleClose={handleClose}
          handleConfirmDelete={handleConfirmDelete}
        />
      ) : null}
      <Row>
        <UserListTitle>
          <AddUserBtn />
        </UserListTitle>
      </Row>
      <Row>
        <TableContent
          loading={loading}
          error={error}
          usersAmount={usersAmount}
          handleShow={handleShow}
          users={users}
        />
      </Row>
    </Layout>
  );
};

export default UserList;
