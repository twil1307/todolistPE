import ModalStyle from "./Modal.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { listContext } from "../../ToDoList";
import { Col, Container, Row } from "react-bootstrap";

function SignNewTask(props) {
  const [list, setList] = useContext(listContext);
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const { name, dob, gpa } = form;
    console.log(name, dob, gpa);
    setList([...list, { name, dob, gpa }]);
    setForm({});
    props.onHide();
  };

  const onCancel = () => {
    setForm({});
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const validateForm = () => {
    const { name, dob, gpa } = form;
    const newErrors = {};

    if (!name || name === "") newErrors.name = "Please enter student name";

    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (!dob || dob === "")
      newErrors.dob = "Please enter student date of birth";
    // else if (age < 18) {
    //   newErrors.dob = "Employee need to be older than 18 years old";
    // }

    if (!gpa || gpa === "")
      newErrors.gpa = "Please enter student date of birth";
    else if (parseInt(gpa) > 4 || parseInt(gpa) < 0 || gpa === "")
      newErrors.gpa = "GPA not accepted, it must be between 0 and 4";

    return newErrors;
  };

  return (
    <div
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={ModalStyle["wrapper"]}
    >
      <div>
        <Container className={ModalStyle["input-container"]}>
          <Row className={ModalStyle["input-field"]}>
            <Col lg={6} sm={12} className={ModalStyle["input-data"]}>
              <label htmlFor="studentName">Full Name</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={form.name ? form.name : ""}
                onChange={(e) => {
                  setField("name", e.target.value);
                }}
                isInvalid={!!errors.name}
                className={!!errors.id && ModalStyle["red-border"]}
              />
              <span className={ModalStyle["falseid"]}>{errors.name}</span>
            </Col>

            <Col lg={6} sm={12} className={ModalStyle["input-data"]}>
              <label htmlFor="gpa">GPA (1~4)</label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={form.gpa ? form.gpa : ""}
                onChange={(e) => setField("gpa", e.target.value)}
                isInvalid={!!errors.gpa}
                className={!!errors.id && ModalStyle["red-border"]}
              />
              <span className={ModalStyle["falseid"]}>{errors.gpa}</span>
            </Col>

            <Col lg={6} sm={12} className={ModalStyle["input-data"]}>
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={form.dob ? form.dob : ""}
                onChange={(e) => {
                  setField("dob", e.target.value);
                }}
                isInvalid={!!errors.dob}
                className={!!errors.id && ModalStyle["red-border"]}
              />
              <span className={ModalStyle["falseid"]}>{errors.dob}</span>
            </Col>
          </Row>
          <footer className={ModalStyle["action"]}>
            <Button
              onClick={() => onCancel()}
              className={ModalStyle["cancel-btn"]}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} className={ModalStyle["add-btn"]}>
              Add Employee
            </Button>
          </footer>
        </Container>
      </div>
    </div>
  );
}

export default SignNewTask;
