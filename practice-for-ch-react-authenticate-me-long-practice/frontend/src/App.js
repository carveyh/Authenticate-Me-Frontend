import { Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      {/* <Route exact path="/">
        <Redirect to="/login"/>
      </Route>
      <Route path="/login" component={LoginFormPage} /> */}

      <Route path="/login">
        <LoginFormPage />
      </Route>
    </>
  );
}

export default App;
