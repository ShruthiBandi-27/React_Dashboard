import { Button, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

export default function StudentList() {
  const [data, setData] = useState([]);
  const nav = useNavigate();
  const getData = () => {
    fetch("https://63f25317aab7d091250663eb.mockapi.io/students")
      .then((data) => data.json())
      .then((res) => setData(res));
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (rollno) => {
    fetch("https://63f25317aab7d091250663eb.mockapi.io/students/" + rollno, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((res) => getData());
  };
  return (
    <Container>
      <Button
        className="mb-3 mt-5 custom-button"
        onClick={() => {
          nav("/createstudent");
        }}
      >
        Create Student
      </Button>
      <h3 className="text-center mb-4">Students</h3>
      <Table hover>
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            <th>Class</th>
            <th>Percentage %</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.rollno}</td>
                <td>{value.name}</td>
                <td>{value.class}</td>
                <td>{value.percentage}</td>
                <td>
                  <Button
                    color="warning"
                    onClick={() => {
                      nav("/editstudent/" + value.rollno);
                    }}
                    className="me-3"
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      handleDelete(value.rollno);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
