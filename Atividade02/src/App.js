import './App.css';
import Home from './components/Home';
import About from './components/About';

import CreateStudent from './components/crud/estudent/CreateStudent';
import ListStudent from './components/crud/estudent/ListStudent';
import EditStudent from './components/crud/estudent/EditStudent';

import CreateProfessor from './components/crud/professor/CreateProfessor';
import ListProfessor from './components/crud/professor/ListProfessor';
import EditProfessor from './components/crud/professor/EditProfessor';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';


function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          UFC
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navitem">
              <Link to="/" className="nav-link">Home</Link>
            </li>

            <li className="navitem">
              <Link to="about" className="nav-link">About</Link>
            </li>

            <NavDropdown title="Student" id="basic-nav-dropdown">
              <NavDropdown.Item >
              <Link to="createStudent" className="dropdown-item">Create Student</Link>
                </NavDropdown.Item>
              <NavDropdown.Item >
              <Link to="listStudent" className="dropdown-item">List Student</Link>
                </NavDropdown.Item>
            </NavDropdown>

            
            <NavDropdown title="Professor" id="basic-nav-dropdown">
              <NavDropdown.Item >
              <Link to="createProfessor" className="dropdown-item">Create Professor</Link>
                </NavDropdown.Item>
              <NavDropdown.Item >
              <Link to="listProfessor" className="dropdown-item">List Professor</Link>
                </NavDropdown.Item>
            </NavDropdown>

          </ul>
        </div>

      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />

        <Route path='createStudent' element={<CreateStudent />} />
        <Route path='listStudent' element={<ListStudent />} />
        <Route path='editStudent/:id' element={<EditStudent />} />

        <Route path='createProfessor' element={<CreateProfessor />} />
        <Route path='editProfessor/:id' element={<EditProfessor />} />
        <Route path='listProfessor' element={<ListProfessor />} />
      </Routes>
    </div>
  );
}

export default App;
