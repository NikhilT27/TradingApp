import logo from "./logo.svg";
import { useQuery } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { FETCH_PORTFOLIO_QUERY } from "./util/graphQuery";
import AddStock from "./pages/AddStock";
import Portfolio from "./pages/Portfolio";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import Login from "./pages/Login";
// import Register from "./pages/Register";

function App() {
  const { loading, data } = useQuery(FETCH_PORTFOLIO_QUERY);
  if (data) {
    console.log(data.getPortfolio);
  }
  return (
    <Router>
      <div className="container">
        <Navbar>
          <Route exact path="/" component={Portfolio} />
          <Route exact path="/addstock" component={AddStock} />
        </Navbar>
      </div>
    </Router>
  );
}

export default App;
