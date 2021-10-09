import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" component={Dashboard} exact /> */}
        <Route path="/signin" component={SignIn} exact />
        <Route path="/signup" component={SignUp} exact />

        <PrivateRoutes path="/" component={Dashboard} exact />
        <PrivateRoutes path="/search" component={Dashboard} exact />
        <PrivateRoutes path="/lib" component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
