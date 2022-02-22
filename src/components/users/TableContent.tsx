import { Alert } from "react-bootstrap";
import { TableContentProps } from "../../types/types";
import UsersTable from "./UsersTable";

const TableContent = ({
  loading,
  error,
  usersAmount,
  handleShow,
  users,
}: TableContentProps) => {
  if (loading) {
    return <Alert variant={"info"}>Loading users...</Alert>;
  } else if (error) {
    return (
      <Alert variant={"danger"}>Failed to load users. Try again later.</Alert>
    );
  } else if (usersAmount === 0) {
    return <Alert variant={"warning"}>No users. Try to add someone!</Alert>;
  } else {
    return <UsersTable users={users} handleShow={handleShow} />;
  }
};

export default TableContent;
