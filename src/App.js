import React from 'react';
import './App.css';
import Districts from "./components/Districts";
import CarPark from "./components/CarPark";
import Spaces from "./components/Spaces";
import {Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";

function App() {
  return (
          <Router>
              <div>
                  <Menu inverted>
                      <Menu.Item
                          name='home'
                          as = {NavLink}
                          to = "/"
                      />
                  </Menu>
                  <br/>
                  <br/>
                  <Switch>
                      <Route path="/carparks/:name" component={Spaces} />
                      <Route path="/districts/:name" component={CarPark} />
                      <Route path="/" exact component={Districts} />
                  </Switch>

              </div>
          </Router>
  );
}

export default App;
