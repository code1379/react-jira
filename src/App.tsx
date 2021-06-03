import { useAuth } from "./context/auth-context";
import UnAuthenticatedApp from "unauthenticated-app";
import AuthenticatedApp from "authenticated-app";
import "./App.css";
import ErrorBoundary from "./components/error-boundary";
import ErrorPage from "components/error-page";
function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={ErrorPage}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
