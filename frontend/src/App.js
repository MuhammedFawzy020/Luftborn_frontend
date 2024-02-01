import * as React from 'react'
import "bootstrap/dist/css/bootstrap.css"

import {BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom'
import ShopList from "./components/list-component";
import EditShop from "./components/edit-component";
import CreateShop from "./components/create-component";

import Login from "./components/login-component";




function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">LUFTBORN</a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
              <li className="nav-item">
                <Link to={"/login"} className="btn btn-primary login">Login</Link>
              </li>
             

            </ul>
          
              </div>
            </div>
        </nav>
       <Routes>
         <Route path="/shops/create" element={<CreateShop/>}></Route>
         <Route path="/shops/edit/:id" element={<EditShop/>}></Route>
         <Route path="/" element={<ShopList/>}></Route>
         <Route path="/login" element={<Login/>}> </Route>

       </Routes>
    </Router>
  );
}

export default App;
