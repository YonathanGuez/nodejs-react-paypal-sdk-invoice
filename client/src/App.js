import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Payement } from './components/Payments';
import Success from './components/Success';
import Cancel from './components/Cancel';
import './App.css';
import './bootstrap.css';
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div></div>}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Payement} exact></Route>
            <Route path="/success" component={Success} exact></Route>
            <Route path="/cancel" component={Cancel} exact></Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
