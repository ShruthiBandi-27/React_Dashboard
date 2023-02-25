import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Container, Button } from "reactstrap";

export default function TeacherList() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("https://63f25317aab7d091250663eb.mockapi.io/teachers")
      .then((data) => data.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    fetch("https://63f25317aab7d091250663eb.mockapi.io/teachers/" + id, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((res) => getData());
  };

  return (
    <Container>
      <Button
        color="primary"
        className="mb-3 mt-5 custom-button"
        onClick={() => {
          nav("/createteacher");
        }}
      >
        Create Teacher
      </Button>
      <h3 className="text-center mb-4">Teachers</h3>
      <Table hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.subject}</td>
                <td>{value.experience}</td>
                <td>
                  <Button
                    color="warning"
                    className="me-3"
                    onClick={() => {
                      nav("/editteacher/" + value.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button color="danger" onClick={() => handleDelete(value.id)}>
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
