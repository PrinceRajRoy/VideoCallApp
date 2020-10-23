import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
// import Meeting from './components/Meeting/Meeting';
import Home from './components/Home/Home';
import Meetiing from './components/Meeting/Meetiing';

function App() {
  return (
    <Switch className="App">
      <Route exact path='/' component={Home} />
      <Route path='/:roomId' component={Meetiing} />
    </Switch>
  );
}

export default App;
