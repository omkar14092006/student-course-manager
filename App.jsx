import { useState } from "react";
import EntityManager from "./components/EntityManager.jsx";

const entities = {
  students: {
    title: "Students",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "course", label: "Course", type: "text", required: true },
    ],
  },
  courses: {
    title: "Courses",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "duration", label: "Duration", type: "text", required: true },
    ],
  },
};

export default function App() {
  const [active, setActive] = useState("students");

  return (
    <>
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand app-title">Student & Course Manager</span>
          <div className="btn-group">
            {Object.keys(entities).map((key) => (
              <button
                key={key}
                className={`btn btn-sm ${active === key ? "btn-light" : "btn-outline-light"}`}
                onClick={() => setActive(key)}
              >
                {entities[key].title}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <main className="container">
        <EntityManager key={active} resource={active} {...entities[active]} />
      </main>
    </>
  );
}
