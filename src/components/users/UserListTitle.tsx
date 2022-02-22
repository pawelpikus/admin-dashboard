import React from "react";
import { Stack } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
};

const UserListTitle = ({ children }: Props) => {
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="d-flex justify-content-between ms-auto bg-light p-3"
    >
      <h4>User List</h4>
      {children}
    </Stack>
  );
};

export default UserListTitle;
