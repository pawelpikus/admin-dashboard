import React from "react";
import { Container, Row } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Container className="my-4">
      <Row>
        <h1 className="py-3 px-0">Dashboard</h1>
      </Row>
      {children}
    </Container>
  );
};

export default Layout;
