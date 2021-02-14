import React from "react";
import Header from "./components/common/Header/Header";
import AllBoards from "./pages/AllBoards/AllBoards";
import { Provider, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import store from "./store";
import Login from "./pages/Login/Login";
import Page404 from "./pages/Page404/Page404";
import Register from "./pages/Register/Register";
import { SnackbarProvider } from "notistack";
import { User } from "./types";

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const email = useSelector((state: User) => state.email);
  return (
    <Route
      {...rest}
      render={(props) =>
        email.length ? (
          //@ts-ignore
          <Component {...props}></Component>
        ) : (
          <Redirect to="/"></Redirect>
        )
      }
    ></Route>
  );
};
function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={1}>
        <Router>
          <Switch>
            <Route path="/" component={Login} exact></Route>
            <Route path="/register" exact component={Register}></Route>
            <PrivateRoute
              path="/all"
              component={AllBoards}
              exact
            ></PrivateRoute>
            <PrivateRoute path="/404" component={Page404}></PrivateRoute>
            <Redirect to="/404"></Redirect>
          </Switch>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}
export default App;
