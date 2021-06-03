import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import PageHeader from "../components/page-header";
import ProjectList from "./project-list";
import Project from "./project";

export default function AuthenticatedApp() {
  return (
    <>
      <Router>
        <PageHeader />
        <Routes>
          <Route path={"/projects"} element={<ProjectList />}></Route>
          <Route path={"/projects/:projectId/*"} element={<Project />}></Route>
          <Navigate to="/projects" />
        </Routes>
      </Router>
    </>
  );
}
