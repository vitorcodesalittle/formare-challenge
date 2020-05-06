import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChatView from './components/ChatView';
import Login from './components/Login';
import ConsultantView from './components/ConsultantView';

function App() {
  return (
    <div>
      <Router>
        <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/chat' component={ChatView} exact/>
        <Route path='/consultant' component={ConsultantView}/>
        </Switch>
      </Router> 
    </div>
  )
}

export default App;
