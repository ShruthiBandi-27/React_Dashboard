import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ActionTeacher() {
  const { id } = useParams();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    experience: "",
  });

  useEffect(() => {
    if (id) {
      fetch("https://63f25317aab7d091250663eb.mockapi.io/teachers/" + id)
        .then((data) => data.json())
        .then((res) => setFormData(res));
    }
  }, [id]);
  const handleSubmit = () => {
    if (id) {
      fetch("https://63f25317aab7d091250663eb.mockapi.io/teachers/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((data) => data.json())
        .then((res) => {
          //console.log("submitted")
          toast.info("Teacher details Updated", {
            onClose: () => {
              console.log("closed");
              setTimeout(function () {
                nav("/teacherlist");
              }, 2000);
            },
          });
          //nav("/teacherlist")
        });
    } else {
      fetch("https://63f25317aab7d091250663eb.mockapi.io/teachers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((data) => data.json())
        .then(
          (res) => {
            toast.success("Teacher Created", {
              onClose: () => {
                console.log("closed");
                setTimeout(function () {
                  nav("/teacherlist");
                }, 2000);
              },
            });
          } //nav("/teacherlist")
        );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <ToastContainer autoClose={2000} />
      <h3 className="text-center">{id ? "Update " : "Create "} Teacher</h3>
      <Form>
        <FormGroup>
          <Label>Name</Label>
          <Input
            name="name"
            placeholder="Teacher Name"
            onChange={handleChange}
            value={formData.name}
          />
        </FormGroup>
        <FormGroup>
          <Label>Subject</Label>
          <Input
            name="subject"
            placeholder="Subject"
            onChange={handleChange}
            value={formData.subject}
          />
        </FormGroup>
        <FormGroup>
          <Label>Experience</Label>
          <Input
            name="experience"
            placeholder="Work Experience in years"
            onChange={handleChange}
            value={formData.experience}
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary" block onClick={handleSubmit}>
            {" "}
            {id ? "Update" : "Submit"}
          </Button>
          <Button
            color="danger"
            block
            className="mt-3"
            onClick={() => {
              nav("/teacherlist");
            }}
          >
            Cancel
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
}
