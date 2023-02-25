import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormGroup,
  Label,
  Input,
  Container,
  Form,
  Row,
  Col,
  Button,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AssignStudentTeacher() {
  const [sdata, setSdata] = useState([]);
  const [tdata, setTdata] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    students: "",
    teachers: "",
  });
  console.log(id);
  useEffect(() => {
    console.log("useEffect of student started");
    fetch("https://63f25317aab7d091250663eb.mockapi.io/students")
      .then((sdata) => sdata.json())
      .then((res) => setSdata(res));
    console.log("useEffect of student ended");
  }, []);

  useEffect(() => {
    console.log("useEffect of teacher started");
    fetch("https://63f25317aab7d091250663eb.mockapi.io/teachers")
      .then((tdata) => tdata.json())
      .then((res) => setTdata(res));
    console.log("useEffect of teacher ended");
  }, []);

  useEffect(() => {
    console.log("student teacher use Effect started");
    if (id) {
      fetch("https://637a64af702b9830b9ed8b16.mockapi.io/studentteacher/" + id)
        .then((data) => data.json())
        .then((res) => setFormData(res));
    }
    console.log("student teacher use Effect ended");
  }, []);

  useEffect(() => {
    console.log("data changed to");
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    console.log("handled event is ");
    console.log(`${e.target.name} is ${e.target.value}`);
    console.log("before data changed");
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("submited");

    if (id) {
      fetch(
        "https://637a64af702b9830b9ed8b16.mockapi.io/studentteacher/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((data) => data.json())
        .then((res) => {
          toast.info("Student/Teacher Assignment Updated", {
            onClose: () => {
              console.log("closed");
              setTimeout(function () {
                nav("/studentteacherlist");
              }, 2000);
            },
          });
        });
    } else {
      fetch("https://637a64af702b9830b9ed8b16.mockapi.io/studentteacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((data) => data.json())
        .then((res) => {
          toast.success("Teacher/Student Assigned", {
            onClose: () => {
              console.log("closed");
              setTimeout(function () {
                nav("/studentteacherlist");
              }, 2000);
            },
          });
        });
    }
  };

  return (
    <Container className="mt-4">
      <ToastContainer autoClose={2000} />
      <h3 className="text-center">
        {" "}
        {id ? "Update" : "Assign"} Student/Teacher
      </h3>
      <Form>
        <Row>
          {" "}
          <Col md={2}></Col>
          <Col md={8}>
            <FormGroup>
              <Label for="students">Select Student</Label>
              <Input
                id="students"
                name="students"
                type="select"
                onChange={handleChange}
                value={formData.students}
              >
                {sdata.map((value, index) => {
                  {
                    /* return <option key={index} selected={value.name===formData.students ? "true" : "false"} >{value.name}</option>; */
                  }
                  return <option key={index}>{value.name}</option>;
                })}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          {" "}
          <Col md={2}></Col>
          <Col md={8}>
            <FormGroup>
              <Label for="teachers">Select Teacher</Label>
              <Input
                id="teachers"
                name="teachers"
                type="select"
                onChange={handleChange}
                value={formData.teachers}
              >
                {tdata.map((value, index) => {
                  return <option key={index}>{value.name}</option>;
                })}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          {" "}
          <Col md={2}></Col>
          <Col md={8}>
            <FormGroup>
              <Button color="primary" block onClick={handleSubmit}>
                {id ? "Update" : "Submit"}
              </Button>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          {" "}
          <Col md={2}></Col>
          <Col md={8}>
            <FormGroup>
              <Button color="danger" block>
                Cancel
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
