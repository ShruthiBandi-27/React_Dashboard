import { Container, FormGroup, Label, Input, Form, Button, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ActionStudent() {
  const { rollno } = useParams();
  //console.log(rollno);
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    percentage: "",
  });
  useEffect(() => {
    if (rollno) {
      fetch("https://63f25317aab7d091250663eb.mockapi.io/students/" + rollno)
        .then((data) => data.json())
        .then((res) => setFormData(res));
    }
  }, [rollno]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (rollno) {
      fetch("https://63f25317aab7d091250663eb.mockapi.io/students/" + rollno, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((data) => data.json())
        .then((res) => {
          toast.info("Student details Updated",{
            onClose: () =>  {
              console.log("closed");
              setTimeout(function() {nav("/studentlist");}, 2000);
            }
          });
        });
    } else {
      fetch("https://63f25317aab7d091250663eb.mockapi.io/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((data) => data.json())
        .then((res) => {
          console.log("submitted")
          toast.success("student created",{
            onClose: () =>  {
              console.log("closed");
              setTimeout(function() {nav("/studentlist");}, 2000);
            }
          });
         
        });
    }
  };
  return (
    <Container className="mt-4">
    <ToastContainer autoClose={2000} />
    <h3 className="text-center">{rollno ? "Update " : "Create "} Student</h3>
      <Form>
      <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            name="name"
            placeholder="Student Name"
            onChange={handleChange}
            value={formData.name}
          />
        </FormGroup>
        </Col></Row>
        <Row>
        <Col md={2}></Col><Col md={8}>
        <FormGroup>
          <Label>Class</Label>
          <Input
            name="class"
            placeholder="Student Class"
            onChange={handleChange}
            value={formData.class}
          />
        </FormGroup>
        </Col></Row>
        <Row>
        <Col md={2}></Col><Col md={8}>
        <FormGroup>
          <Label>Percentage</Label>
          <Input
            name="percentage"
            placeholder="Student Percentage"
            onChange={handleChange}
            value={formData.percentage}
          />
        </FormGroup>
        </Col></Row>
        <Row> <Col md={2}></Col><Col md={8}>
        <FormGroup>
          <Button color="primary" block onClick={handleSubmit}>
            {rollno ? "Update" : "Submit"}
          </Button>
        </FormGroup>
        </Col></Row>
        <Row> <Col md={2}></Col><Col md={8}>
        <FormGroup>
          <Button
            color="danger"
            block
            onClick={() => {
              nav("/studentlist");
            }}
          >
            Cancel
          </Button>
        </FormGroup>
        </Col></Row>
        </Form>
    </Container>
  );
}
