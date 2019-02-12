import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './App.css';
import ProductForm from './components/ProductForm';
import Home from './components/Home'

class App extends Component {



  render() {
    return (
      <BrowserRouter>
      
      <Switch>
         <Route path="/" component={Home} exact/>
         <Route path="/add" component={ProductForm} />
       </Switch>
    
       
      </BrowserRouter>
    );
  }
}

export default App;
