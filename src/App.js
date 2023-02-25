import "./App.css";
import NavBar from "./NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentList from "./StudentList";
import TeacherList from "./TeacherList";
import ActionStudent from "./ActionStudent";
import ActionTeacher from "./ActionTeacher";
import AssignStudentTeacher from "./AssignStudentTeacher";
import StudentTeacherList from "./StudentTeacherList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/teacherlist" element={<TeacherList />} />
          <Route path="/createstudent" element={<ActionStudent />} />
          <Route path="/createteacher" element={<ActionTeacher />} />
          <Route path="/editstudent/:rollno" element={<ActionStudent />} />
          <Route path="/editteacher/:id" element={<ActionTeacher />} />
          <Route path="/studentteacherlist" element={<StudentTeacherList />} />
          <Route path="/editteacher/:id" element={<ActionTeacher />} />
          <Route
            path="/assignstudentteacher"
            element={<AssignStudentTeacher />}
          />
          <Route
            path="/editstudentteacher/:id"
            element={<AssignStudentTeacher />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
