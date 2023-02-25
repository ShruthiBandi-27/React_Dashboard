import { Button, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentTeacherList() {
  const [data, setData] = useState([]);
  const nav = useNavigate();
  const getData = () => {
    fetch("https://637a64af702b9830b9ed8b16.mockapi.io/studentteacher")
      .then((data) => data.json())
      .then((res) => setData(res));
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    console.log("delete");
    fetch("https://637a64af702b9830b9ed8b16.mockapi.io/studentteacher/" + id, {
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
          nav("/assignstudentteacher");
        }}
      >
        Assign Student/Teacher
      </Button>
      <h3 className="text-center mb-4">Students/Teachers</h3>
      <Table hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Student</th>
            <th>Teacher</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.students}</td>
                <td>{value.teachers}</td>
                <td>
                  <Button
                    color="warning"
                    className="me-3"
                    onClick={() => {
                      nav("/editstudentteacher/" + value.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      handleDelete(value.id);
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
