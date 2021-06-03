import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import Kanban from "./c-cpns/Kanban";
import Epic from "./c-cpns/Epic";
export default function Project() {
  return (
    <div>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path={"kanban"} element={<Kanban />}></Route>
        <Route path={"epic"} element={<Epic />}></Route>
        <Navigate to="kanban" />
      </Routes>
    </div>
  );
}
