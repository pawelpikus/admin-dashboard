import React, { useState, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import Layout from "./Layout";
import { userAdded } from "./usersSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [validated, setValidated] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // `PropertyKey` is short for "string | number | symbol"
  // since an object key can be any of those types, our key can too
  // in TS 3.0+, putting just "string" raises an error
  function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj;
  }

  const setField = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (hasKey(errors, field)) {
      if (!!errors[field])
        setErrors({
          ...errors,
          [field]: null,
        });
    }
  };

  const findFormErrors = () => {
    const { name, email } = form;
    const emailPattern = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
    const newErrors = { name: "", email: "" };
    if (!name || name === "") newErrors.name = "Fill in this field.";
    else if (name.length > 30) newErrors.name = "Name is too long.";
    if (!email || email === "") newErrors.email = "Fill in this field.";
    else if (!email.match(emailPattern))
      newErrors.email = "Please provide a valid email address.";
    return newErrors;
  };

  const usersAmount = useAppSelector((state) => state.users.length);

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
      setValidated(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const newErrors = findFormErrors();
    const isEmptyErrors = Object.values(newErrors).every(
      (x) => x === null || x === ""
    );

    if (!isEmptyErrors) {
      setErrors(newErrors);
    } else {
      dispatch(
        userAdded({
          id: usersAmount + 1,
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
