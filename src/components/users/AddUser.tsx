import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Layout from "./Layout";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Layout>
      <Row className="border bg-light mb-4 py-4">
        <h4>Add new User</h4>
      </Row>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 ">
          <Form.Group as={Row} classname="mb-3" controlId="validationCustom01">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control required type="text" placeholder="Your Name" />
            </Col>
            <Form.Control.Feedback>Correct!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please fill in this field.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3 text-right">
          <Form.Group as={Row} classname="mb-3" controlId="validationCustom02">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control required type="email" placeholder="Your Email" />
            </Col>
            <Form.Control.Feedback>Correct!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please fill in this field.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="d-flex justify-content-end p-2">
          <Button variant="outline-danger">Cancel</Button>

          <Button className="mx-3" variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default AddUser;
