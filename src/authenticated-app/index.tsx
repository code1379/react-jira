import ProjectList from "./project-list";
import PageHeader from "../components/page-header";
export default function AuthenticatedApp() {
  const value: any = undefined;
  return (
    <>
      {value.notExist}
      <PageHeader />
      <ProjectList />
    </>
  );
}
