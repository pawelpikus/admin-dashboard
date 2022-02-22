import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { findFormErrors } from "../../utils/findFormErrors";
import { hasKey } from "../../utils/hasKey";
import Layout from "./Layout";
import { userAdded } from "./usersSlice";

const AddUser = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", api: "" });
  const [validated, setValidated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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

  const generateUID = (): number => {
    let uid = Math.floor(Math.random() * 100);
    return uid;
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
      const uid = generateUID();
      try {
        await axios.post(`https://jsonplaceholder.typicode.com/posts/`, {
          id: uid,
          name: form.name,
          email: form.email,
          username: "",
          address: {
            city: "",
          },
        });
      } catch (e) {
        setErrors({
          ...errors,
          api: "There has been a problem posting data. Try again later.",
        });
      }
      dispatch(
        userAdded({
          id: generateUID(),
          name: form.name,
          email: form.email,
          username: "",
          address: {
            city: "",
          },
        })
      );
      setValidated(true);
      handleReset();
      navigate("/");
    }
  };

  return errors.api ? (
    <div>{errors.api}</div>
  ) : (
    <Layout>
      <Row className="border bg-light mb-4 py-4">
        <h4>Add new User</h4>
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
            Submit
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default AddUser;
