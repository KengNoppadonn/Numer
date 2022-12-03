import React ,{Component} from "react";
import {useState} from 'react';
import {NavBar} from'./Component/NavBar'
import {Home} from './Component/Home'
import { Bisection } from "./Rootof/Bisection";
import {FalsePosition} from "./Rootof/FalsePosition"
import {Onepoint} from "./Rootof/Onepoint"
import {Secant} from "./Rootof/Secant"
import { NewtonR } from "./Rootof/NewtonR"
import {Eliminate} from "./Gauss/Eliminate"
import {Cramer } from "./Gauss/Cramer"
import {Spline} from "./Interpolation/Spline"
import {NewtonD} from "./Interpolation/NewtonD"
import {MultiRegression} from"./Regression/MultiRegression"
import {Lagrange} from "./Interpolation/Lagrange"
import {LinearRegression} from "./Regression/LinearRegression"
import {PoRegression} from "./Regression/PoRegression"
import {Multi} from "./Regression/Multi"








import { BrowserRouter,Routes,Route} from "react-router-dom";
import { Graphical } from "./Rootof/Graphical";





function App() { 
  return (
    <div className="App">
      
      
     
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Graphical" element={<Graphical/>} />
          <Route path="/Bisection" element={<Bisection/>} />
          <Route path="/FalsePosition" element={<FalsePosition/>} />
          <Route path="/Onepoint" element={<Onepoint/>} />
          <Route path="/Secant" element={<Secant/>} />
          <Route path="/NewtonR" element={<NewtonR/>} />
          <Route path="/Eliminate" element={<Eliminate/>}/>
          <Route path="/Cramer" element={<Cramer/>}/>
          <Route path="/Lagrange" element={<Lagrange/>}/>
          <Route path="/NewtonD" element={<NewtonD/>}/>
          <Route path="/Spline" element={<Spline/>}/>
          <Route path="/MultiRegression" element={<MultiRegression/>}/>
          <Route path="/LinearRegression" element={<LinearRegression/>}/>
          <Route path="/PoRegression" element={<PoRegression/>}/>
          <Route path="/Multi" element={<Multi/>}/>
                 
          
         
        </Routes>
          
      </BrowserRouter>
    </div>
  );
}

export default App;
