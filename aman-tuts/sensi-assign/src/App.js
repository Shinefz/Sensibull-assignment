import Stocks from "./stocks";
import Quotes from "./Quotes";
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
function App() {
  return (
    <div>
       <Router>
       <Routes>
      <Route path="/" element={<Stocks />} />
      <Route path="/Quotes" element={<Quotes />} />
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
