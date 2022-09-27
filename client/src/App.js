import "./Assets/css/app.css";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import PublicRoutes from "./Utils/Routes";

function App() {

  const publicRoutes = PublicRoutes;

  return (
    <Router>
      <Switch>
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

const NoMatch = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Pagina no encontrada D:</h1>
      <button onClick={() => history.push('/')}>Volver a casaaaa... ♪♫</button>
    </div>
  );
}

export default App;
