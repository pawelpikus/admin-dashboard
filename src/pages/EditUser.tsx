import { useState, useRef } from "react";
import { userUpdated } from "../redux/usersSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { Row, Form, Col, Button } from "react-bootstrap";
import Layout from "../components/Layout";
import { hasKey } from "../utils/hasKey";
import { findFormErrors } from "../utils/findFormErrors";
import axios from "axios";

const EditUser = () => {
  const { pathname } = useLocation();
  const userId = pathname.replace("/edit-user/", "");
  const user = useAppSelector((state) =>
    state.users.entities.find((user) => user.id.toString() === userId)
  );
  const [form, setForm] = useState({
    name: user?.name,
    email: user?.email,
  });

  const [errors, setErrors] = useState({ name: "", email: "" });
  const [validated, setValidated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const setField = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (hasKey(errors, field)) {
      if (!!errors[field])
        setErrors({
          ...errors,
          [field]: "",
        });
    }
  };

  findFormErrors(form);

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
      setValidated(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const newErrors = findFormErrors(form);
    const isEmptyErrors =
      newErrors &&
      Object.values(newErrors).every((x) => x === null || x === "");

    if (!isEmptyErrors && newErrors) {
      setErrors(newErrors);
    } else {
      try {
        await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${userId}`,
          {
            ...user,
            id: Number(userId),
            name: form.name,
            email: form.email,
          }
        );
      } catch (e) {
        console.log(e);
      }

      dispatch(
        userUpdated({
          ...user,
          id: Number(userId),
          name: form.name,
          email: form.email,
        })
      );
      setValidated(true);
      handleReset();
      navigate("/");
    }
  };

  return (
    <Layout>
      <Row className="border bg-light mb-4 py-4">
        <h4>Edit User</h4>
      </Row>
      <Form
        ref={formRef}
        validated={validated}
        noValidate
        onSubmit={handleSubmit}
      >
        <Row className="mb-3 ">
          <Form.Group as={Row} controlId="validationCustom01">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(e) => setField("name", e.target.value)}
                isInvalid={!!errors.name}
                required
                value={form.name}
                type="text"
                placeholder="Your Name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <Row className="mb-3 text-right">
          <Form.Group as={Row} controlId="validationCustom02">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(e) => setField("email", e.target.value)}
                isInvalid={!!errors.email}
                required
                value={form.email}
                type="email"
                placeholder="Your Email"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>
        <div className="d-flex justify-content-end p-2">
          <Link to="/">
            <Button variant="outline-danger">Cancel</Button>
          </Link>
          <Button className="mx-3" variant="primary" type="submit">
            Save User
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default EditUser;
